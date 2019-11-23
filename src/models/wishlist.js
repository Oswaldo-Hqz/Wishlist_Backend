const {Schema, model} = require('mongoose'); //modelar los datos del modelo

const wishlistSchema = new Schema({
    title: String,
    list: {
        type: String,
        required: true
    },
    author: String,
    date: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true //agrega dos propiedades fecha cracion y actualizacion
});

module.exports = model('Wishlist', wishlistSchema);