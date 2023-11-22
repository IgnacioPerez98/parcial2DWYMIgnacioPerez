class Player{

    /*
    * Id: string (se sugiere número representado como string)
Nombre: string
Posición: string (sólo se acepta GK, DF,MD,FW)
Suspendido: boolean
Lesionado: boolean
    * */
    constructor(id,nombre, pos, susp, les) {
        this.Id = id;
        this.Nombre = nombre;
        this.Posicion = pos;
        this.Suspendido = susp;
        this.Lesionado = les;

    }

    Validar(){
        if(typeof this.Id !== 'string') return false;
        if(typeof this.Nombre !== 'string') return false;
        if(typeof this.Posicion !== 'string') return false;
        if(typeof this.Suspendido !== 'boolean') return false;
        if(typeof this.Lesionado !== 'boolean') return false;
        return true;
    }

}

module.exports = Player;