const express = require('express');
const fs = require('fs');
const { title } = require('process');
const app = express();

app.set('view engine', 'ejs');


app.listen(3000,"localhost",()=>{
    console.log("listening on port 3000");
})

app.get("/",(req,res)=>{
    const blogs = [
        {title:"Blog 1",author:"Author 1"},
        {title:"Blog 2",author:"Author 2"},
        {title:"Blog 3",author:"Author 3"},
        {title:"Blog 4",author:"Author 4"},
    ]
    res.render("index",{blogs});
})

app.get("/about",(req,res)=>{
    res.render("about");
    
})

app.get("/about-me",(req,res)=>{
    res.redirect("/about");
})

app.use((req,res,next)=>{
    res.render("404");
})