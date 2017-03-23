'use strict'

const {get} = require('http');



module.exports.getJSON = (url) => {


    return new Promise((resolve, reject)=>{

      get(url, (res)=>{
        const statusCode = res.statusCode;
        const contentType = res.headers['content-type'];

        let error;
        if(statusCode !== 200) {
          error = new Error(`Request Failed.\n Status Code: ${statusCode}`)
         }
        else if (!/^text\/javascript/.test(contentType)){
          error = new Error(`Invalid content-type.\n Expected application/json but received ${contentType}`)
        }

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
