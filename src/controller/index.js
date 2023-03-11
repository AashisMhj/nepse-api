const limitArray = ['100', '500', '200'];
const model = require('../../db/models');

const getFloorData = async (req, res, next)=>{
    try {
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;
        const data = await model.floor_sheet.findAll({
            limit,
            offset
        })
        return res.status(200).json({
            data
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Server Error'
        });
    }
}

const getTradingData = async (req, res, next)=>{
    try {
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;
        const data = await model.stock_trading.findAll({
            limit,
            offset
        });
        return res.status(200).json({
            data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
}
module.exports = {
    getFloorData,
    getTradingData
}