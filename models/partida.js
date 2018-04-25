class Partida {

    set setJugador(jugador) {
        this.jugadors.push(jugador);
    }

    get getJugador() {
        return this.jugadors;
    }

    constructor() {
        this.jugadors = [];
        this.tr = [];
        this.td = [];
    }

    crearTaulell() {
        var i = 0;
        var j = 0;
        var nombre_de_files = 8;
        var nombre_de_columnes = 8;

        for (i = 0; i < nombre_de_files; i++) {
            this.td.push(i);
        }
        for (j = 0; j < nombre_de_columnes; j++) {
            this.tr.push(j);
        }
    }

    toString() {
        console.log(this.getJugador);
    }
}

module.exports = Partida;
