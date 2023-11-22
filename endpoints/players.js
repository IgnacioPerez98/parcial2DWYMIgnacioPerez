const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();

const authHandler = require('../handlers/authhandler')
const validator = require('../servicios/validator')
const responses = require('../servicios/errormessages')
const storage = require('../storageemulado/FileBBDD')
const Player = require('../models/player')
router.get('/players/:id', (req,res) => {
    try {
        let authstatus = authHandler.validartokenfromheader(req);
        if (authstatus !== 200) return res.status(authstatus).json(responses.getMessage(authstatus))
        let id = req.params.id;
        console.log(id);
        if(validator.nullorempty(id)) return res.status(400).json(responses.getMessage(400));
        let jugador = storage.buscarplayer(id);
        if(jugador=== 404){
            return  res.status(400).json(responses.getMessage(400));
        }
        return res.status(200).json(jugador);
    }catch (error){
        return res.status(500).json(responses.getMessage(500));
    }
})

router.get('/players',(req,res)=>{
    try{
        let authstatus = authHandler.validartokenfromheader(req);
        if (authstatus !== 200) return res.status(authstatus).json(responses.getMessage(authstatus))
        //recupero el query param
        let {position} = req.query;
        //si es vacio
        if(typeof position === 'undefined') {
            let col = storage.retornarTodos();
            return res.status(200).json(col);
        }else {
            if(validator.nullorempty(position)) return res.status(400).json(responses.getMessage(400));
            let response = storage.buscarporPos(position);
            if(typeof res === 'number'){ return  res.status(response).json(responses.getMessage(response))}
            return  res.status(200).json(response);
        }

    }catch (error){
        return res.status(500).json(responses.getMessage(500));
    }
})

router.post('/players', (req,res)=>{
    try{
        let authstatus = authHandler.validartokenfromheader(req);
        if (authstatus !== 200) return res.status(authstatus).json(responses.getMessage(authstatus))
        const {name, position, suspended,inyured} = req.body;
        if(
            validator.nullorempty(name) ||
            validator.nullorempty(position)||
            typeof suspended !== 'boolean' ||
            typeof inyured !== 'boolean'
        ){
            return  res.status(400).json(responses.getMessage(400));
        }
        let plr = new Player("0",name, position, suspended,inyured);
        let result = storage.agregarplayer(plr);
        if(result){
            return res.status(200).json({Message: "Creado con exito"})
        }else {
            return res.status(400).json({Message: "Ya existe ese jugador"})
        }
    }catch (error){
        return res.status(500).json(responses.getMessage(500));
    }
})

router.put('/players/:id', (req,res)=>{
    try{
        let authstatus = authHandler.validartokenfromheader(req);
        if (authstatus !== 200) return res.status(authstatus).json(responses.getMessage(authstatus))

        let id = req.params.id;
        console.log(id);
        if(validator.nullorempty(id)) return res.status(400).json(responses.getMessage(400));

        const {name, position, suspended,inyured} = req.body;
        if(
            validator.nullorempty(name) ||
            validator.nullorempty(position)||
            typeof suspended !== 'boolean' ||
            typeof inyured !== 'boolean'
        ){
            return  res.status(400).json(responses.getMessage(400));
        }
        let plr = new Player(id,name, position, suspended,inyured);
        let result = storage.remplazar(plr);
        if(result){
            return res.status(200).json({Message: "Creado con exito"})
        }else {
            return res.status(400).json({Message: "Ya existe ese jugador"})
        }
    }catch (error){
        return res.status(500).json(responses.getMessage(500));
    }
})


router.delete('/players/:id', (req,res)=>{
    try {
        let authstatus = authHandler.validartokenfromheader(req);
        if (authstatus !== 200) return res.status(authstatus).json(responses.getMessage(authstatus))
        let id = req.params.id;
        console.log(id);
        if(validator.nullorempty(id)) return res.status(400).json(responses.getMessage(400));
        let jugador = storage.eliminarplayer(id);
        if(jugador!== 200){
            return  res.status(jugador).json(responses.getMessage(jugador));
        }
        return res.status(200).json(jugador);
    }catch (error){
        return res.status(500).json(responses.getMessage(500));
    }
})


router.post("/call" , (req,res)=>{
    try {
        let authstatus = authHandler.validartokenfromheader(req);
        if (authstatus !== 200) return res.status(authstatus).json(responses.getMessage(authstatus))
        let {Message} = storage.convocar();
        if (typeof  Message === 'undefined'){
            return res.status(200).json(storage.convocar())
        }else {
            return res.status(400).json(Message);
        }

    }catch (error){
        return res.status(500).json(responses.getMessage(500));
    }
})

module.exports = router;