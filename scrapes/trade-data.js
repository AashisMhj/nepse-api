// Script to scrape data from stock trading
const { default: puppeteer } = require('puppeteer');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')})
const models = require(path.join(__dirname, '../db/models'));
const { removeCommas } = require(path.join(__dirname, '../helper/index'));
const HIT_URL = `${process.env.NEPSE_URL}/stock-trading`;
console.log(HIT_URL);
const FROM_DATE = '02/01/2023';
const TO_DATE = '02/10/2023';

(async () => {
    // clear table
    await models.stock_trading.truncate({ cascade: false });
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(HIT_URL);
    const inputSelector = await page.waitForSelector('.symbol-search');
    await inputSelector.click();
    const dropDowns = await page.waitForSelector('.dropdown.open');
    const selectedSymbols = await dropDowns.evaluate((el) => {
        const buttons = el.querySelectorAll('.dropdown-item');
        return Array.from(buttons).map((item, index) => {
            return item.querySelector('span').innerText;
        })
    });
    await page.evaluate(() => {
        const dates = document.querySelectorAll('input[bsdatepicker]');
        if (dates[0]) {
            dates[0].id = "from_date";
        }
        if (dates[1]) {
            dates[1].id = "to_date";
        }
        return Array.from(dates).map((item) => item.value);
    })
    // const fromDateSelector = await page.waitForSelectorAll('input[bsdatepicker]')
    const fromDateSelector = await page.waitForSelector('#from_date');
    const toDateSelector = await page.waitForSelector('#to_date');
    await fromDateSelector.type(FROM_DATE);
    await toDateSelector.type(TO_DATE);


    // selectedSymbols.slice(0, 10).forEach(async (current_symbol) => {
        let current_symbol = selectedSymbols[0];
        await inputSelector.click();
        // const dropDownButtonSelector = await page.waitForSelector(`#index`);
        // await dropDownButtonSelector.click();
        await inputSelector.type('');
        await inputSelector.type(current_symbol.split(0, 4));
        const dropDownsButtonSelector = await page.waitForSelector('.dropdown-item');
        await dropDownsButtonSelector.click();
        const buttonSelector = await page.waitForSelector('.box__filter--search');
        await buttonSelector.click();
        await page.waitForSelector('table tr td');
        const dividing_index = current_symbol.indexOf(")");
        const stock_symbol = current_symbol.slice(0, dividing_index).replace("(", '');
        const company_name = current_symbol.slice(dividing_index+1);

        const extractRows= await page.evaluate((passedData) => {
            const rows = document.querySelectorAll('tbody tr');
            const data = [];
            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].querySelectorAll('td');
                const row = [];
                for (let j = 0; j < cells.length; j++) {
                    row.push(cells[j].textContent.trim());
                }
                if (row.length === 8) {
                    data.push({
                        stock_symbol: passedData.stock_symbol,
                        company_name: passedData.company_name,
                        date: row[1],
                        total_transaction: row[2],
                        total_traded_shares: row[3],
                        total_traded_amount: row[4],
                        max_price: row[5],
                        min_price: row[6],
                        close_price: row[7],
                    })
                }
            }
            return data;
        }, { stock_symbol, company_name });
        console.log(extractRows.length);
        await models.stock_trading.bulkCreate(extractRows.map((item) => {
            return {
                ...item,
                total_transaction: parseInt(item.total_transaction) || 1,
                total_traded_shares: parseInt(item.total_traded_shares) || 1,
                total_traded_amount: removeCommas(item.total_traded_amount) || 1,
                max_price: parseFloat(item.max_price) || 1,
                min_price: parseFloat(item.min_price) || 1,
                close_price: parseFloat(item.close_price) || 1
            }
        }))
    // })
})()
