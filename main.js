'use strict'



const {getJSON} = require('./getStocks.js');
const {findAverage} = require('./findAverage');
const {getSymbol} = require('./parseArgs');

//get the user supplied stock symbol
let stringParams = getSymbol();
//call the function that gets 365 days worth of closing prices for that stock
getJSON(`http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=${stringParams}`)
//then find the average closing price of that stock
.then((res)=>{
  let result = findAverage(res);
  console.log(result);
})
