const express = require('express');
const cors = require('cors');

//Endpoints
const authRoute = require('./endpoints/login.js');
const playersRoute = require('./endpoints/players');

//Almaceno instancia de express
const app = express();
app.use(express.json());

app.use(cors({
  origin: function(origin, callback){
      return callback(null, true);
  }
}));
// Rutas de la API
app.use('/',authRoute );
app.use('/',playersRoute );

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});