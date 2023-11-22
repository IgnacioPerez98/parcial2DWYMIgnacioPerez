let validator = {
    /*
    * Retorna true, si un valor string es nulo o vacio.
    * */
    nullorempty: function (param){
        if(param === null) return true;
        if (param.trim()==='') return true;
        return false;
    }
}
module.exports = validator;