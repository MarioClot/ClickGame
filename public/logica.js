var socket = io.connect('http://localhost:3000');
window.onload = inici;
var email;
var color='red';

function inici(){
    document.getElementById("gameboard").addEventListener("click",pinta,false);
}

function pinta(e){
    console.log(e.target.id);
    socket.emit('putColor', {id: e.target.id, color: color});
}

socket.on('objecteJugador',function(data){
    email = data.email;
    color = data.color;
    console.log(data),
    console.log(email);
})

socket.on('getColor',function(data){
    document.getElementById(data.id).style.backgroundColor = data.color;

    console.log(data);
})