const wishlistController = {};

const wishlistModel = require('../models/wishlist');

wishlistController.getWishlists = async (req, res) => {
    const wishlists = await wishlistModel.find();
    res.json(wishlists);
    };

// wishlistController.createWishlist = (req, res) => res.json({message: 'method POST'}); 
wishlistController.createWishlist = async (req, res) => {
    // console.log(req.body);
    
    const { title, list, date, author } = req.body;
    const newWishlist = new wishlistModel({
        title: title,
        list: list,
        date: date,
        author: author
    });   
    await newWishlist.save();
    
    res.json({message: 'Guardado!'})
}; 

wishlistController.getWishlist = async (req, res) => {
    // console.log(req.params.id);
    const wishlist = await wishlistModel.findById(req.params.id);

    res.json(wishlist);
};

wishlistController.updateWishlist = async (req, res) => {
    // console.log(req.params.id, req.body);
    const {title, list, author} = req.body;
    await wishlistModel.findOneAndUpdate({_id: req.params.id }, {
        title: title,
        author: author,
        list: list
    });

    res.json({message: 'Actualizado!'});
};

wishlistController.deleteWishlist = async (req, res) => {
    await wishlistModel.findByIdAndDelete(req.params.id);
    
    res.json({message: 'Eliminado!'});
}; 

module.exports = wishlistController;

