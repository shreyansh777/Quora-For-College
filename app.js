require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const _ = require('lodash');
const port = 3000;
let posts = [];
let myArray = Object.values(posts);

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

mongoose.connect("mongodb://127.0.0.1:27017/Portfolio",{useNewUrlParser: true});


const postSchema = {
  title: String,
  content: String,
  date: String,
  time : String
};
const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
    Post.find({}, function(err,posts){
    res.render('home.ejs', {
        posts: posts
    });
})
});
app.get("/compose",(req,res) => {
    res.render('compose.ejs');
})
app.get("/login",(req,res) => {
    res.render('login.ejs');
    res.redirect("/");
})

const date = new Date();
const n = date.toDateString();
const time = date.toLocaleTimeString();


app.post('/compose', (req, res) => {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody,
        date : n,
        time : time
         
    });
    post.save();
    res.redirect("/");

});

app.get('/posts/:userId', function (req, res) {
    let requestedTitle = _.lowerCase(req.params.userId);
    
    Post.find((err,posts)=>{
        if(err){
            console.log(err);
        }else{
    posts.forEach((i) => {
        const storedTitle = _.lowerCase(i.title);

   if (storedTitle === requestedTitle) {
            res.render('post.ejs', {
                title: i.title,
                content: i.content,
                date : i.date,
                time : i.time

            });
        }
    });
}
});
});


app.listen(process.env.PORT || port,()=>{
    console.log(`The application started successfully on port ${port}`);
});

