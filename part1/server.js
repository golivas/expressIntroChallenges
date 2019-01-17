var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var path = require('path')


app.get('/hello', function (req, res) {
  res.send("Hello!");
});

app.post("/create/:name", function (req, res) {
  let namesJson = {
    "id": 0,
    "name": req.params.name
  }
  res.json(namesJson)
})

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.get("/verify/:age", function(req, res) {
  if(req.params.age >= 13){
    res.sendStatus(200)
  }else if(req.params.age < 13){
    res.sendStatus(403)
  }
})

app.use(function (req, res) {
  res.sendStatus(404);
});

app.listen(port, function () {
  console.log('Listening on port', port);
});
