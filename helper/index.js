module.exports = {
    removeCommas: (data)=>{
        const newData = data?.replace(',', '');
        parseFloat(newData) || 0;
    }
}