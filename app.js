// curl "localhost:3000/img" -X POST -F data=@test.jpg
// http://localhost:3000/img/xxxxx

const PORT = process.env.PORT || 3000;
var TMPDIR = 'c:\\temp\\'
var express = require('express');
var ejs = require("ejs");
var multer  = require('multer');
var upload = multer({ dest: TMPDIR });
var fs = require('fs');

var app = express();
app.engine('ejs', ejs.renderFile);
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
    res.render('test.ejs', 
        {title: 'Test Page' , 
            content: 'this is test.'});
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


app.get('/img/:fname', function(req, res){
    console.log(req.params.fname);
    fs.readFile(TMPDIR + req.params.fname, function(err, data){
        res.set('Content-Type', 'image/jpeg');
        res.send(data);
    });
});

app.post('/img', upload.single('data'), function (req, res) {
    console.log(req.file);
    res.end('success');
});

var server = app.listen(PORT, function(){
    console.log('Server is running!');
})
