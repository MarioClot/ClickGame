var socket = io.connect('http://localhost:3000');
window.onload = inici;
var color='red';

function recuperaCookie(){
    //todo 
}

function inici(){
    document.getElementById("gameboard").addEventListener("click",pinta,false);
    socket.emit('recuperaEmail','prova@prova');
}

function pinta(e){
    console.log(e.target.id);
    socket.emit('putColor', {id: e.target.id, color: color});
}


socket.on('giveColorBack',function(data){
    color = data;
    console.log(color);
})


socket.on('getColor',function(data){
    document.getElementById(data.id).style.backgroundColor = data.color;

    console.log(data);
})