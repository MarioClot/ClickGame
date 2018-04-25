class Jugador{
    
    constructor(email, password, color, puntuacio){
        this.email = email;
        this.password = password;
        this.puntuacio = 0;
        this.color = color;
    }

    toString () {
        console.log('Nom del jugador: '+ this.email);
    }
}

module.exports = Jugador;
