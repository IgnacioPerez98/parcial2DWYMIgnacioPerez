const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const env = require('dotenv')

//Middlewares
const val = require('../servicios/validator');
const errors = require('../servicios/errormessages')
const fileBBDD = require('../storageemulado/FileBBDD')
const authHandler = require('../handlers/authhandler')

//Configuro las variables de entorno del archivo  .env
env.config();

router.post('/login', (req,res)=>{
    try{
        const { user, password}= req.body;
        if(val.nullorempty(user)&& val.nullorempty(password)){
            console.log("Auth param error:",user,password);
            return res.status(400).json(errors.getMessage(400));
        }
        let existe = fileBBDD.existeUsuario(user,password);
        if(existe){
            let tokencito = jwt.sign({ user}, process.env.TOKENSECRET, { algorithm: "HS512" ,expiresIn: '1h' })
            return  res.status(200).json({token : tokencito});
        }else {
            return  res.status(401).json(errors.getMessage(401));
        }

    }catch(error){
        console.log("Error en auth endpoint:",error)
        return res.status(500).json(errors.getMessage(500));
    }
})

module.exports = router;