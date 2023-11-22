let errors ={
    getMessage: function (errorCode){
        switch (errorCode){
            case 200:
                return {Message :"Operacion exitosa"};
            case 400:
                return {Message :"El parametro proporcionado no tiene el formato correcto."};
            case 401:
                return {Message :"El usuario proporcionado no esta autorizado para la operación."};
            case 403:
                return {Message :"No tiene permiso para realizar esta operación"};
            case 404:
                return {Message :"El recurso solicitado no fue encontrado."};
            case 500:
                return {Message :"Error en el servidor"};
        }
    }
}
module.exports = errors;