//app.js
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
var ejs = require("ejs");

app.engine('ejs', ejs.renderFile);


//app.get('/', function(req, res) {
//  res.send('Hello World3')
//});
app.get('/', function(req, res){
    res.render('test.ejs', 
        {title: 'Test Page4' , 
            content: 'this is test.'});
})

//app.listen(PORT);
var server = app.listen(PORT, function(){
    console.log('Server is running!');
})
