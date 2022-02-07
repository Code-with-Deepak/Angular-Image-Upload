var express = require('express');
var app = express.Router();
var path = require('path');
var changePath = process.cwd();
var db = require('../models/db.js');
require('dotenv').config();

app.get('/photo',function(req,res){
    var sql = process.env.sql2;
    db.query(sql,function(err,result){
        if(err)
        throw err;
        res.json(result);
    })
})

module.exports = app;