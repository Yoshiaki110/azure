//app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
 
app.get('/', function(req, res) {
  res.send('Hello World2')
});
 
//app.listen(PORT);
var server = app.listen(PORT, function(){
    console.log('Server is running!');
})
