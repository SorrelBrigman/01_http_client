'use strict'



const {getJSON} = require('./getStocks.js');
const {findAverage} = require('./findAverage');
const {getSymbol} = require('./parseArgs');

// let tickerSymbol = process.argv[2];

// let params = {
//   'Normalized' : false,
//   'NumberOfDays': 365,
//   'DataPeriod': 'Day',
//   'Elements': [
//     {'Symbol': tickerSymbol,
//     'Type': 'price',
//     'Params': ['c']}
//   ]
// }

// let stringParams = JSON.stringify(params);
let stringParams = getSymbol();

getJSON(`http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=${stringParams}`)
.then((res)=>{
  findAverage(res)
})
