// curl "https://linecars.azurewebsites.net/img" -X POST -F data=@test.jpg
// https://linecars.azurewebsites.net/img/xxx
// https://linecars.azurewebsites.net/inquiry

//const TMPDIR = 'c:\\temp\\'
const TMPDIR = 'D:\\home\\site\\wwwroot\\uploads\\'
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const ejs = require("ejs");
const multer  = require('multer');
const upload = multer({ dest: TMPDIR });
const fs = require('fs');
const request = require('request');

app.engine('ejs', ejs.renderFile);
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

var hash_list = new Array();
function chk(){
    console.log('chk()');
    for(key in hash_list) {
        console.log('  ' + key + ' ' + hash_list[key]);
    }
}

app.get('/', function(req, res){
    console.log('<>get /');
    res.render('test.ejs', 
        {title: 'Test Page', 
         content1: 'this is test.',
         content2: '23'});
})
app.get('/inquiry/:fname', function (req, res) {
    console.log('<>get /inquiry/:fname');
    chk();
    console.log(req.params.fname);
    res.send(hash_list[req.params.fname]);
})
app.get('/input', function(req, res){
    console.log('<>get /input');
    res.render('input.ejs');
})
app.get('/select', function(req, res){
    console.log('<>get /select');
    res.render('select.ejs');
})
app.post('/msg', function(req, res){
    console.log('<>post /msg');
    console.log(req.body);
    res.render('test.ejs', 
        {title: 'Message Send', 
         content1: req.body.id,
         content2: req.body.msg});
})
app.get('/tc', function(req, res){
    console.log('<>get /tc');
    res.render('tc.ejs');
})
app.post('/tc', function(req, res){
    console.log('<>post /tc');
    console.log(req.body.code);
    var options = {
        url: 'http://mimamorikun.azure-mobile.net/tables/toyota_tc?$filter=(code%20eq%20%27' + req.body.code + '%27)',
        json: true
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body[0].eng);
        } else {
            console.log('error: '+ response.statusCode);
        }
        res.render('test.ejs', 
            {title: 'Trouble Code : ' + req.body.code,
             content1: req.body.id,
             content2: body[0].eng});
    })
})

app.get('/img/:fname', function(req, res){
    console.log('<>get /img/:fname');
    console.log(req.params.fname);
    console.log(TMPDIR + req.params.fname);
    fs.readFile(TMPDIR + req.params.fname, function(err, data){
        res.set('Content-Type', 'image/jpeg');
        res.send(data);
    });
    hash_list[req.params.fname]  = 'send';
});
app.post('/img', upload.single('data'), function (req, res) {
    console.log('<>post /img');
    console.log(req.file);
//    res.end('success');
    res.end(req.file.filename);
    hash_list[req.file.filename]  = 'none';
    chk();
});

var server = app.listen(PORT, function(){
    console.log('Server is running!');
})
