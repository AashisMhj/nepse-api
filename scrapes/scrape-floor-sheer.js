// Script to scrape data from puppeteer and insert to db
const { default: puppeteer } = require('puppeteer');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')})
const models = require(path.join(__dirname,'../db/models'));
const {removeCommas} = require(path.join(__dirname,'../helper/index'));

const HIT_URL = `${process.env.NEPSE_URL}/floor-sheet`;


(async () => {
    // clear table
    models.floor_sheet.truncate({cascade: false});
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(HIT_URL);
    await page.waitForSelector('select');
    const dropDownSelector = await page.select('select', '500');
    const filterButtonSelector = await page.waitForSelector('.box__filter--search');
    await filterButtonSelector.click();
    // let next = true;
    let next = 0;
    while(next < 10){
        const tableSelector = await page.waitForSelector('table tr td');
        const extractedRows = await page.evaluate(() => {
            const rows = document.querySelectorAll('table tr');
            const data = [];
            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].querySelectorAll('td');
                const row = [];
                for (let j = 0; j < cells.length; j++) {
                    row.push(cells[j].textContent.trim());
                }
                // skip for last row
                if ( row.length == 8) {
                    data.push({
                        contact_no: parseInt(row[1]),
                        stock_symbol: row[2],
                        buyer: parseInt(row[3]),
                        seller: parseInt(row[4]),
                        quantity: parseInt(row[5]),
                        rate: parseFloat(row[6]),
                        amount: row[7],
                    });
                }
            }
            return data;
        });
        await models.floor_sheet.bulkCreate(extractedRows.map((item)=>{
            return {
                ...item,
                amount: removeCommas(item.amount)
            }
        }));
        const nextPageSelector = await page.waitForSelector('.pagination-next');
        let response = await nextPageSelector.evaluate((element)=>{
            return element.className;
        });
        await nextPageSelector.click();
        next ++;
        // if(response === 'pagination-next'){
        //     await nextPageSelector.click();
        // }else{
        //     next = false;
        // }
    };
    await browser.close();
})()
