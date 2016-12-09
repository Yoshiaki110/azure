//app.js
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
var ejs = require("ejs");


app.get('/', function(req, res) {
  res.send('Hello World3')
});
 
//app.listen(PORT);
var server = app.listen(PORT, function(){
    console.log('Server is running!');
})
