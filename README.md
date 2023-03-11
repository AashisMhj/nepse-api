# Nepsi API

Nodejs Application to scrape data of www.nepalstock.com using puppeteer, saving to db and later proving the data over rest api.

## Packages used
1. Sequelize: Database ORM.
1. Express: Web Server.
1. Puppeteer: For scraping the data.

## Installing process
1. Setup your env file: Copy the content of .env file and make necessary changes if you have to. See .env.example for reference.
2. Migrate tables
```bash
yarn sequelize db:migrate
```
### Scrape Data
3. scrape today floor data
```
yarn scrape:floor
```

4. scrape trading data
The trading scraper currently only scrapes only one company and only the first page.
You can change the company, from-date and to-date in the file.
```
yarn scrape:trade
```

5. Run server
```bash
yarn dev:server
```

## API Endpoints
| API       | query params |
|-----------|--------------|
| /api/today-price | limit:number, offset:number |
| /api/trading-data | limit:number,offset:number |
