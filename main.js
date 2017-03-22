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
    //I need to nail down the response to get the prices
    //the response has a key called "Elements" which holds an array
    //inside the first item of the array is a key called "DataSeries" (which itself is an object)
    //inside the "DataSeries" object is a key called "close", and inside of the key called "close"
    //there is the key called "values" which holds all the prices.
    let pricesArray = response.Elements[0].DataSeries.close.values;
    console.log("prices", pricesArray);

    let averageStockPrice = ()=>{
      let sum = 0;
      for (let i = 0; i < pricesArray.length; i++){
        sum += pricesArray[i];
      }
      return (sum/365)
    }
    let result = averageStockPrice().toFixed(2);

    console.log("average $", result);

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
