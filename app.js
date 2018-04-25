var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
const monk = require('monk')

// Connection URL
const url = 'localhost:27017/clickgame';

const db = monk(url);

db.then(() => {
  console.log('Connected correctly to mongoDB')
})

var app = express();

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'vistes'));
app.set('view engine', 'pug');

// serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



/*
// creem una aplicació del tipus application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

//http://localhost:3000/usuari/3
app.get('/usuari/:id', function (req, res) {
    res.send('usuari ' + req.params.id);
});

//http://localhost:3000/suma/3/2
app.get('/suma/:n1/:n2', function (req, res) {
    res.send('la suma és ' + (req.params.n1 * 1 + req.params.n2 * 1));
});

//http://localhost:3000/comprar?usuari=sergi
app.get('/comprar', function (req, res) {
    res.send('usuari ' + req.query.usuari);
});

//http://localhost:3000/comprarCamisa?camisa[mida]=XL
app.get('/comprarCamisa', function (req, res) {
    res.send('mida ' + req.query.camisa.mida);
});

app.get('/', function (req, res) {
    res.send("Hola Món!");
});

app.post('/pujar', function (req, res) {
    res.send("POST rebut");
});

//app.post(path, callback [, callback ...])
app.post('/processar', urlencodedParser, function (req, res) {

    // generem una sortida en format JSON
    respostaJSON = {
        nom: req.body.nom,
        cognom: req.body.cognom
    };
    console.log(respostaJSON);
    res.end(JSON.stringify(respostaJSON));
})


app.use('/usuari/:codi', function (req, res, next) {
    console.log('petició a usuari:', req.method);
    next();
  });
  
  var log = function (req, res, next) {
    console.log('peticio rebuda');
    next();
  };
  
  var dataPeticio = function (req, res, next) {
    req.dataPeticio = Date.now();
    next();
  };
  
  app.use(dataPeticio);
  app.use(log);
  
  app.get('/', function (req, res) {
    var resposta = 'Petició feta en: ' + new Date(req.dataPeticio) + '';
    res.send(resposta);
  });

*/
var servidor = app.listen(3000, function () {
    var host = servidor.address().address
    var port = servidor.address().port
    console.log("Escoltant en http://%s:%s", host, port)
});
// qualsevol altre petició retorna 404 not found
//req i res són els mateixos objectes de NodeJS
