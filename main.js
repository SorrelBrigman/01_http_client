const {get, createServer} = require('http');

const server = createServer();

// Write a program that performs an HTTP GET request to get the average stock price.
//Use the first argument for a ticker symbol.
//Use the get method in the http module with the API provided by MarkitOnDemand.

// It would certainly be easier to test if you can grab the latest stock price,
//but because the response is so small, there may not be an opportunity to demonstrate chunking.
//On the API docs you will see an example request for data to create a chart.
//This will give 365 of daily prices.
//Use these prices to get an average.

// Expected:

// $ ./stocks.js AAPL
// $123.45
