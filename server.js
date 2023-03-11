const express = require('express');
require('dotenv').config();
//
const routes = require('./src/routes/index');

// variables
const PORT = process.env.PORT || 5001;

// app config
const app = express();
app.use('/api', routes);
app.use('*', (_, res)=>{
    res.send('Route Not Fund');
})

app.listen(PORT, ()=> console.log(`Server started at: ${PORT}`));