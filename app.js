// curl "localhost:3000/img" -X POST -F data=@test.jpg
// http://localhost:3000/img/xxxxx

const TMPDIR = 'c:\\temp\\'
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const ejs = require("ejs");
const multer  = require('multer');
const upload = multer({ dest: TMPDIR });
const fs = require('fs');

app.engine('ejs', ejs.renderFile);
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
    res.render('test.ejs', 
        {title: 'Test Page' , 
            content: 'this is test.8'});
})
app.get('/input', function(req, res){
    res.render('input.ejs');
})
app.post('/msg', function(req, res){
    console.log(req.body);
    res.render('test.ejs', 
        {title: 'Message Send' , 
            content: req.body.msg});
})

var server = app.listen(PORT, function(){
    console.log('Server is running!');
})
