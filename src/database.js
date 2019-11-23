const mongoose = require('mongoose');

//Conexion a base de datos
const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/DBDevelop';

//Configuracion de la conexion
mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//validacion para la conexion abierta
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB is connected!');
    
});