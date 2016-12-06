var express = require('express')
var multer = require('multer')
var multerAzure = require('multer-azure')
 
var app = express()
 
var upload = multer({ 
  storage: multerAzure({
    account: 'linecars', //The name of the Azure storage account 
    key: 'F5tVm8iweO5rPfasM/QMisLu9feX3MPWTzt8YhdAHc2TdedWRWfl4bge7IQy2N9XtFinZJhFSX6/fNePYlSJoA==', //A key listed under Access keys in the storage account pane 
    container: 'linecars'  //Any container name, it will be created if it doesn't exist 
  })
})
 
app.post('/', upload.any(), function (req, res, next) {
  console.log(req.files)
  res.status(200).send('Uploaded: ' + req.files)
})