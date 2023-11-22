const Player = require('../models/player')

let players  = [
    new Player("0",'Diego Forlan', 'FW',true,true)
];


let fileBBDD = {

    existeUsuario: function (usuario,contrasena){
        return usuario === "Bielsa" && contrasena === "PW2023"? true:false;
    },
    agregarplayer: function (player){
            let plr = new Player("0",player.Nombre, player.Posicion, player.Suspendido,player.Lesionado);
            if(!plr.Validar()) return false;
            if(players.some(p => p.Nombre === plr.Nombre && p.Posicion === plr.Posicion) === true){
                return false;
            }else {
                let idMax = 0;
                 players.forEach(p =>{
                    if( +p.Id > idMax ){
                        idMax = p.Id;
                    }
                });
                 player.Id = idMax + 1;
                players.push(player)
                return true;
            }
    },
    eliminarplayer : function (id){
        let ply = players.find(p => p.Id === id)
        let indice = players.indexOf(ply);
        if(indice !== -1){
            players.splice(indice, 1);
            return 200;
        }else {
            return 404;
        }
    },
    buscarplayer : function (id){
        let playercitos = players.filter(p => p.Id === id)
        if(playercitos.length > 0 ){
            return players[0];
        }else {
            return 404;
        }
    },
    buscarporPos : function (pos){
        let indice = players.filter(p => p.Posicion === pos)
        if(indice !== null){
            return indice;
        }else {
            return 404;
        }
    },
    remplazar: function (player){
        let plr = new Player(player.Id,player.Nombre, player.Posicion, player.Suspendido,player.Lesionado);
        let busq =  players.find(p => p.Id === player.Id)
        let indice = players.indexOf(busq);
        if(indice !== -1){
            return players[indice];
        }
        return 404;
    },
    retornarTodos : function (){
        return players;
    },
    convocar: function (){
        if(players.length !== 22){
            return {Message : "No hay 22 jugadores"};
        }
        let conv = players.filter(
            p => p.Lesionado === false && p.Suspendido === false

        )
        if(conv.length !== 22){
            return {Message : "No suma 22 jugadores sanos/no suspendidos"};
        }
        if(!conv.some(p => p.Posicion === "GK")){
            return {Message : "No hay GK"};
        }
        if(!conv.some(p => p.Posicion === "DFC")){
            return { Message : "No hay DFC"};
        }
        if(!conv.some(p => p.Posicion === "MD")){
            return {Message : "No hay MD"};
        }
        if(!conv.some(p => p.Posicion === "FW")){
            return {Message : "No hay FW"};
        }
        return  conv;

    }

}

module.exports = fileBBDD;