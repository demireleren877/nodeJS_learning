const express = require('express');
const fs = require('fs');

const app = express();

app.listen(3000,"localhost",()=>{
    console.log("listening on port 3000");
})

app.get("/",(req,res)=>{
    res.send("Hello World I am Eren");
})

app.get("/about",(req,res)=>{
    res.sendFile("./views/about.html",{root:__dirname});
    
})

app.get("/about-me",(req,res)=>{
    res.redirect("/about");
})

app.use((req,res,next)=>{
    res.status(404).sendFile("./views/404.html",{root:__dirname});
})