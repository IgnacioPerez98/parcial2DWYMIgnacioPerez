let personas  = [];


let fileBBDD = {

    existeUsuario: function (usuario,contrasena){
        return usuario === "Ignacio" && contrasena === "abcd1234"? true:false;
    },
    agregarpersona: function (personas){
            if(typeof personas != 'Persons') return false;
            if(personas.some(p => p.nombre === personas.nombre & p.apellido === personas.apellido) === true){
                return false;
            }else {
                personas.push(personas)
                return true;
            }
    },
    eliminarpersona : function (nombre, apellido){
        let indice = personas.indexOf( p => p.nombre === nombre && p.apellido === apellido);
        if(indice !== -1){
            personas.splice(indice, 1);
            return 200;
        }else {
            return 404;
        }
    },
    buscarpersona : function (nombre,apellido){
        let indice = personas.indexOf( p => p.nombre === nombre && p.apellido === apellido);
        if(indice !== -1){
            return personas.indexOf(indice);
        }else {
            return 404;
        }
    }

}

module.exports = fileBBDD;