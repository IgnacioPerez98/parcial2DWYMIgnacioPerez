const jwt = require("jsonwebtoken");

let authHandler ={
    validarToken : function (token){
        try {
            let resultado =  jwt.verify(token,process.env.TOKENSECRET.toString())
            return resultado != null;
        }catch (error){
            console.log("Error Handler Token", error);
            return false;
        }
    },
    validartokenfromheader: function (req){
        try{
            const head = req.headers['authorization'];
            if(!head){
                return 400;
            }
            let token = head.split(" ").at(1);
            let validate = this.validarToken(token);
            if(validate){
                return 200;
            }else {
                return 401;
            }
        }catch (error){
            return 400;
        }
    }

}

module.exports = authHandler;