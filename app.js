const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbUrl = "mongodb+srv://de877:whilede877@cluster0.pv6in.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/blogs",(req,res)=>{
    const blog = Blog(req.body)
    blog.save().then((result)=>{
        res.redirect('/blogs')
    })
})

app.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then(result => {
      res.render('details', { blog: result, title: result.title });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(result => {
        res.json( {redirect: "/blogs"} );
        })
        .catch(err => {
        console.log(err);
        });
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
