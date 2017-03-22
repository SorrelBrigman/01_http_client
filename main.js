'use strict'

const {get} = require('http');

//Use the first argument for a ticker symbol.
const tickerSymbol = process.argv[2];

// Write a program that performs an HTTP GET request to get the average stock price.


let params = {
  'Normalized' : false,
  'NumberOfDays': 365,
  'DataPeriod': 'Day',
  'Elements': [
    {'Symbol': tickerSymbol,
    'Type': 'price',
    'Params': ['c']}
  ]
}

let stringParams = JSON.stringify(params);
console.log(stringParams)
get(`http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=${stringParams}`, (res)=>{
  const statusCode = res.statusCode;

  let error;
  if(statusCode !== 200) {
    error = new Error(`Request Failed.\n Status Code: ${statusCode}`)
   }
  //else if (!/^application\/json/.test(contentType)){
  //   error = new Error(`Invalid content-type.\n Expected application/json but received ${contentType}`)
  // }

  if (error) {
    console.log(error.message);
    res.resume();
    return;
  }

  let body = '';
  res.on('data', (buff)=>{
    body += buff.toString();
  });
  res.on('end', ()=>{
    console.log(JSON.parse(body));
    let response = JSON.parse(body);
    console.log("response", response);
    let prices = response.Elements[0].DataSeries.close.values;
    console.log("prices", prices);

  }).on('error', (e)=>{
    console.log('Got error message: ', e.message);
  })
})
//Use the get method in the http module with the API provided by MarkitOnDemand.
//markitDemand query http://dev.markitondemand.com/Api/v2/InteractiveChart?dataperiod=year&element=[symbol=${tickerSymbol},"price":["ohlc"]]
// It would certainly be easier to test if you can grab the latest stock price,
//but because the response is so small, there may not be an opportunity to demonstrate chunking.
//On the API docs you will see an example request for data to create a chart.
//This will give 365 of daily prices.
//Use these prices to get an average.

// Expected:

// $ ./stocks.js AAPL
// $123.45
