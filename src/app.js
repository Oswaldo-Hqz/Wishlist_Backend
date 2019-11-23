const express = require('express');
const cors = require('cors');
const app = express();

//settings
app.set('port', process.env.PORT || 4000);

//middleware
app.use(cors());
app.use(express.json());

//routes
// app.get('/api/users', (req, res) => res.send('Ruta de usuarios'));
app.use('/api/users', require('./routes/users'));
app.use('/api/wishlist', require('./routes/wishlist'));

module.exports = app;