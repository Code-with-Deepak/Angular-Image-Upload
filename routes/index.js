var express = require('express');
var app = express.Router();
var path = require('path');
var changePath = process.cwd();
var db = require('../models/db.js');

app.get('/',function(req,res){
    res.render('home.ejs',{message:"Server Status : Ready to Upload"});
})

app.get('/search',function(req,res){
    res.render('search.ejs');
})





module.exports = app;