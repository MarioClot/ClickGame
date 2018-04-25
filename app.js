// Connection URL




// Make our db accessible to our router


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

*//*
var servidor = require('http').createServer(app);
var io = require('socket.io')(servidor);
servidor.listen(3000);
*/

// qualsevol altre petició retorna 404 not found
//req i res són els mateixos objectes de NodeJS

