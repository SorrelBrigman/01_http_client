'use strict'

module.exports.findAverage = (data)=>{
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
    let result = `$${averageStockPrice(pricesArray)}`;

    //return the average price
    return result;


}
