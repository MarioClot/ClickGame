document.getElementById("gameboard").addEventListener("click",pinta,false);

function pinta(e){
    console.log(e.target.id);
    document.getElementById(e.target.id).style.backgroundColor = 'red';
}