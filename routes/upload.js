var express = require('express');
require('dotenv').config();
var app = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');
const { threadId } = require('../models/db.js');
var changePath = process.cwd();
var ts = Date.now();
        var dateObj = new Date(ts);
        var date = dateObj.getDate();
        var month = dateObj.getMonth()+1;
        var year = dateObj.getFullYear();
        var hour = dateObj.getHours();
        var min = dateObj.getMinutes();
        var sec = dateObj.getSeconds();
        var time = date+"-"+month+"-"+year+" "+hour+":"+min+":"+sec;
        console.log(time);

var storage = multer.diskStorage({
    destination: (req,file,callBack) => {
        callBack(null,'./public/uploads')
    },
    filename: (req,file,callBack) => {
        callBack(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
});

var db = require("../models/db.js");

app.post('/',upload.single('image'),function(req,res){
    var name = req.body.name;
    
    if(!req.file)
    res.render('home.ejs',{message:"No File is chosen"});
    else
    {
        fileName = req.file.filename;
        imgPath = "http://localhost:3000/"+fileName;
        console.log(imgPath);
        var sql = process.env.sql1;
        db.query(sql,[name,imgPath,time,fileName],(err,result) => {
            if(err){
                if(err.message.indexOf('Duplicate')){
                    res.render('home.ejs',{message:"Name Already Chosen"});
                    try {
                        fs.unlinkSync(changePath+"/public/uploads/"+fileName);
                        console.log("Successfully deleted the file.")
                      } catch(err) {
                        throw err
                      }
                }
            }            
            console.log("File Uploaded Successfully");
            res.render('home.ejs',{message:"File with Name : "+name+" Uploaded Successfully"});
            res.end();
        })
    }
})



module.exports = app;