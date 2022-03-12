const express = require('express');
const fs = require('fs');
const { title } = require('process');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


const dbUrl = "mongodb+srv://de877:whilede877@cluster0.pv6in.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to database"))
const app = express();

app.set('view engine', 'ejs');


app.listen(3000,"localhost",()=>{
    console.log("listening on port 3000");
})

app.get("/add-blog",(req,res)=>{
    const blog = new Blog({
        title: "My first blog",
        snippet: "This is my first blog",
        body: "This is my first blog"
    })
    blog.save().then((result)=>{
        res.send(result);
    })
})


app.get("/get-blogs",(req,res)=>{
    Blog.find().then((result)=>{
        res.send(result);
    })
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