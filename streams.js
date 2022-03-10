const fs = require('fs');
const readStream = fs.createReadStream('./aws_log.txt');

// readStream.on("data",(chunk)=>{
//     console.log("----------------")
//     console.log(chunk.toString())
// })


