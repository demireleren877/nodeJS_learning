const http = require('http');
const _ = require('lodash');

const server = http.createServer((req,res)=>{
    if(req.url==='/'){
        const num = _.random(1,100);
        console.log(num)
        res.write('Hello World');
        res.end();
    }else if(req.url==='/api'){
        res.write();
        res.end();
    }
});


server.listen(3000, "localhost", ()=>{
    console.log("listening on port 3000");
})