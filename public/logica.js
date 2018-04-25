var socket = io.connect('http://localhost:3000');
window.onload = inici;

function inici(){
    document.getElementById("gameboard").addEventListener("click",pinta,false);
}

function pinta(e){
    console.log(e.target.id);
    socket.emit('putColor', {id: e.target.id, color: "blue"});
}



socket.on('getColor',function(data){
    document.getElementById(data.id).style.backgroundColor = data.color;
    console.log(data);
})