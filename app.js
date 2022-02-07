var express = require('express');
var mysql = require('mysql');
var multer = require('multer');
var app = express();
var bodyparser = require('body-parser');
var dotenv = require('dotenv');

app.use(express.static('public/images')); 
app.use(express.static('public/stylesheets'));
app.use(express.static('public/uploads'));

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))

app.set('view-engine','ejs');

const index = require('./routes/index.js');
const gotfile = require('./routes/upload.js');
const gotData = require('./routes/data.js');

app.use('/',index);
app.post('/',gotfile);
app.use('/db',gotData);

app.listen(3000,function(){
    console.log("Server Started at http://localhost:3000");
})