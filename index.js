var express = require('express');
const pug = require('pug');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
const monk = require('monk');
var path = require('path');

var app = express();

const url = 'localhost:27017/clickgame';
const db = monk(url);

db.then(() => {
    console.log('Connected correctly to mongoDB')
})

var Rx = require('rx');
var Jugador = require('./models/jugador');
var Partida = require('./models/partida');

var jugadors = [];
var colors = ["yellow", "red", "green", "blue"];
var partides = [];
//var partida;


// APP USE
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use(function (req, res, next) {
    req.io = io;
    next();
});

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'pug');
app.set('views', './vistes');
// serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

var io = require('socket.io').listen(app.listen(3000));
console.log("server iniciat");

/* GET home. */
app.get('/', function (req, res, next) {
    res.render('index', { title: 'ClickGame', message: 'Benvingut a ClikGame!' });
});

/* GET registre. */
app.get('/registre', function (req, res, next) {
    res.render('registre');
});

/* POST registre. */
app.post('/registre', function (req, res, next) {
    var email = req.body.email
    var password = req.body.password

    var db = req.db;
    var collection = db.get('usuaris');

    collection.findOne({ email: email }, {}, function (e, doc) {
        console.log(doc)
        if (doc != null) {
            res.render('registre', { message: 'usuari ja registrat' });
        } else {
            collection.insert({ email: email, password: password })
            res.render('index', { title: 'ClickGame', message: 'Benvingut a ClikGame, ' + email });
        }
    });
});

/* GET login. */
app.get('/login', function (req, res, next) {
    res.render('login');
});

/* POST login. */
app.post('/login', function (req, res, next) {
    var email = req.body.email
    var password = req.body.password
    var partida;

    var db = req.db;
    var collection = db.get('usuaris');

    collection.findOne({ email: email, password: password }, {}, function (e, doc) {
        if (doc == null) {
            res.render('login', { message: 'usuari no registrat' });
        } else {
            collection.insert({ email: email, password: password })
            var jugador = new Jugador(email, password, colors[colors.length - 1]);
            colors.pop();

            partida = partides[partides.length - 1];
            if (partida == null) {
                partida = new Partida();

                partida.setJugador = jugador;
                partides.push(partida);
                console.log("primer jugador");
                console.log(partida);
            } else if (partida.getJugador.length != 4) {
                partida.setJugador = jugador;
                console.log("jugadors senars");
                console.log(partida);
            } else {

                partida = new Partida();
                partida.setJugador = jugador;
                partides.push(partida);
                console.log("jugadors parells");
                console.log(partida);
            }
            console.log("Abans d'anar a partida, num de jugadors:" + partida.getJugador.length);
            io.sockets.on('connection',function(socket){
                socket.emit("objecteJugador",jugador);
            })
            
            res.redirect('/partida');
        }
    });
});

/* GET partida. */
app.get('/partida', function (req, res, next) {
    var partida = partides[partides.length - 1];
    console.log("Partides: " + partides.length);
    console.log("Jugadors a la partida: " + partida.getJugador.length);


    if (partida.getJugador.length == 1) {
        partida.crearTaulell();

    }

    //hacer las celdas clickables
    //if click jugador element.style.backgroundColor del td = partida.getJugador[0].color




    res.render('partida', {
        title: 'ClickGame', message: 'benvingut a ClickGame, ', tr: partida.tr, td: partida.td,
        waiting: false,
    });
});

function enviarMissatges(socket, data) {
    socket.emit('getColor', data);
    socket.broadcast.emit('getColor', data);
}

function enviarPuntuacions(socket,data) {
    socket.emit('puntuacio',data);
    socket.broadcast.emit('puntuacio',data);
}

io.sockets.on('connection', function (socket) {
    socket.on('putColor', function (data) {
        console.log('dades rebudes del client->' + data.id + " - " + data.color);
        enviarMissatges(socket, data);
    })
    socket.on('puntuacions',function (data){
        enviarPuntuacions(socket,data);
    })
})
