

const fs = require('fs');



if(!fs.existsSync("./assets")){
    fs.mkdir("./assets",(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Directory created");
        }
    })
}else{
    console.log("Directory already exists");
}