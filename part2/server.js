var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
const fs = require('fs')
const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.post('/create/:name/:age', function(req, res) {
  fs.readFile("./storage.json", "utf8", function(err, data){
    if(err) throw err;
    let usersArr = JSON.parse(data);

    console.log(req.body);
    usersArr.push(req.body);

    fs.writeFile("./storage.json", JSON.stringify(usersArr), function(err){
      if(err) throw err;

      res.sendStatus(200);

    })

  })
});

app.get('/', function(req, res) {
  fs.readFile('./storage.json', 'utf8', function(err, data){
    if(err) throw err;
    let usersArr = JSON.parse(data);

    res.json(usersArr);
  })
});

app.get('/users/:name', function(req, res) {
  fs.readFile('./storage.json', 'utf8', function(err, data){
    if(err) throw err;
    let usersArr = JSON.parse(data);

    for(let i = 0; i<usersArr.length; i++){
      if(usersArr[i].name == req.params.name){
        res.json(usersArr[i]);
        return;
      }
    }
    res.sendStatus(400);
  })
});

app.listen(port, function () {
  console.log('Listening on port', port);
});
