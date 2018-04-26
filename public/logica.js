var socket = io.connect('http://localhost:3000');
window.onload = inici;
var email;
var color;
var tds;
var puntsRed;
var puntsBlue;
var puntsGreen;
var puntsYellow;

function inici(){
    tds = document.querySelectorAll("td");
    document.getElementById("gameboard").addEventListener("click",pinta,false);
}

function pinta(e){
    socket.emit('putColor', {id: e.target.id, color: color});
}

setInterval(calculPuntuacio,500);

socket.on('objecteJugador',function(data){
    email = data.email;
    color = data.color;
    console.log(data),
    console.log(email);
})

socket.on('getColor',function(data){
    var celaTarget = document.getElementById(data.id);
    if(document.getElementById(data.id.slice(-2)-1)){
        
    }
    console.log(data.id.slice(-2)-1);
    celaTarget.style.backgroundColor = data.color;

    console.log(data);
})

socket.on('puntuacio',function(data) {
    var marcador = document.getElementById('puntuacions').children;
    marcador[1].innerHTML = data.puntsRed;
    marcador[3].innerHTML = data.puntsBlue;
    marcador[5].innerHTML = data.puntsGreen;
    marcador[7].innerHTML = data.puntsYellow;
})

function calculPuntuacio(){
    puntsRed = 0;
    puntsBlue = 0;
    puntsGreen = 0;
    puntsYellow = 0;
    
    tds.forEach(function(element) {
        if(element.style.backgroundColor == 'red'){
            puntsRed+=1;
        }else if(element.style.backgroundColor == 'blue'){
            puntsBlue+=1;
        }else if(element.style.backgroundColor == 'green'){
            puntsGreen+=1;
        }else if(element.style.backgroundColor == 'yellow'){
            puntsYellow+=1;
        }
    })

    socket.emit('puntuacions',{puntsRed: puntsRed,puntsBlue: puntsBlue,puntsGreen: puntsGreen,puntsYellow: puntsYellow,})
}