var mysql = require('mysql');

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'image'
});

db.connect(function(err){
    if(err)
    throw err;
    console.log("Successfully Connected to Database");
})

module.exports = db;

