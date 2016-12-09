// curl "https://linecars.azurewebsites.net/img" -X POST -F data=@test.jpg
// https://linecars.azurewebsites.net/img/xxx

//const TMPDIR = 'c:\\temp\\'
const TMPDIR = 'D:\\home\\site\\wwwroot\\uploads\\'
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
            content: 'this is test.16'});
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
app.get('/tc', function(req, res){
    res.render('tc.ejs');
})
app.post('/tc', function(req, res){
    console.log(req.body);
    res.render('test.ejs', 
        {title: 'Trouble Code' , 
            content: req.body.code});
})

app.get('/img/:fname', function(req, res){
    console.log(req.params.fname);
    console.log(TMPDIR + req.params.fname);
    fs.readFile(TMPDIR + req.params.fname, function(err, data){
        console.log('aaaa');
        res.set('Content-Type', 'image/jpeg');
        res.send(data);
        console.log('bbbb');
    });
});
app.post('/img', upload.single('data'), function (req, res) {
    console.log(req.file);
    res.end('success');
});

var server = app.listen(PORT, function(){
    console.log('Server is running!');
})
