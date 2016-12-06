var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var app = express();

app.post('/', upload.single('data'), function (req, res) {
  console.log(req.file);
  res.end('success');
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
