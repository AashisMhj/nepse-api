const router = require('express').Router();
const {
    getFloorData,
    getTradingData
} = require('../controller');

router.get('/today-price', getFloorData);
router.get('/trading-data', getTradingData);

module.exports = router;