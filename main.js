'use strict'

const {get} = require('http');


//Use the first argument for a ticker symbol.
const tickerSymbol = process.argv[2];

// Write a program that performs an HTTP GET request to get the average stock price.

//Use the get method in the http module with the API provided by MarkitOnDemand.
//markitDemand query http://dev.markitondemand.com/Api/v2/InteractiveChart?dataperiod=year&element=[symbol=${tickerSymbol},"price":["ohlc"]]
// It would certainly be easier to test if you can grab the latest stock price,
//but because the response is so small, there may not be an opportunity to demonstrate chunking.
//On the API docs you will see an example request for data to create a chart.
//This will give 365 of daily prices.

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






// get(`http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=${stringParams}`, (res)=>{
//   const statusCode = res.statusCode;
//   const contentType = res.headers['content-type'];


//   let error;
//   if(statusCode !== 200) {
//     error = new Error(`Request Failed.\n Status Code: ${statusCode}`)
//    }
//   // else if (!/^application\/json/.test(contentType)){
//   //   error = new Error(`Invalid content-type.\n Expected application/json but received ${contentType}`)
//   // }

//   if (error) {
//     console.log(error.message);
//     res.resume();
//     return;
//   }

//   let body = '';
//   res.on('data', (buff)=>{
//     body += buff.toString();
//   });
//   res.on('end', ()=>{
//     //I need to nail down the response to get the prices
//     //the response has a key called "Elements" which holds an array
//     //inside the first item of the array is a key called "DataSeries" (which itself is an object)
//     //inside the "DataSeries" object is a key called "close", and inside of the key called "close"
//     //there is the key called "values" which holds all the prices.
//     // let pricesArray = response.Elements[0].DataSeries.close.values;
//     //using ES6 restructuring to get to the array of daily price closing
//     let {Elements : [{DataSeries: {close :{values}}}]} = JSON.parse(body);

//     let pricesArray = values;

// //Use these prices to get an average.
//     let averageStockPrice = (arr)=>{
//       let sum = 0;
//       for (let i = 0; i < arr.length; i++){
//         sum += arr[i];
//       }
//       return (sum/(arr.length + 1)).toFixed(2)
//     }
//     let result = averageStockPrice(pricesArray);

//     console.log("$",result);

//   }).on('error', (e)=>{
//     console.log('Got error message: ', e.message);
//   })
// })

// Expected:

// $ ./stocks.js AAPL
// $123.45
// Abstract a getJSON function. (This is good practice for when we write our own APIs):
// const getJSON = (url, cb) => { ... }
// getJSON('http://example.com', data => { ... })

const getJSON = (url) => {
  return new Promise((resolve, reject)=>{

    get(url, (res)=>{
      const statusCode = res.statusCode;
    //   const contentType = res.headers['content-type'];

      let error;
      if(statusCode !== 200) {
        error = new Error(`Request Failed.\n Status Code: ${statusCode}`)
       }
      // else if (!/^application\/json/.test(contentType)){
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
        resolve(body);
      })
    })
  })
}


const findAverage = (data)=>{
  let {Elements : [{DataSeries: {close :{values}}}]} = JSON.parse(data);

  let pricesArray = values;

  //Use these prices to get an average.
  let averageStockPrice = (arr)=>{
    let sum = 0;
    for (let i = 0; i < arr.length; i++){
      sum += arr[i];
    }
    return (sum/(arr.length + 1)).toFixed(2)
    }
    let result = averageStockPrice(pricesArray);

    console.log("$",result);


}

getJSON(`http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=${stringParams}`)
.then((res)=>{
  findAverage(res)
})


// Promisify the getJSON function:
// const getJSON = url => { ... }
// getJSON('http://example.com').then(data => { ... })
