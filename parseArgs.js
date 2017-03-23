'use strict'

module.exports.getSymbol = ()=>{
  let tickerSymbol = process.argv[2];

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
  return stringParams;
}
