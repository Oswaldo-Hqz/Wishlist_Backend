const { Router } = require('express');//funcion Router
const router = Router();

// router.route('/').get((req, res) => res.send('Ruta de wishlist'));
// router.route('/').get((req, res) => res.json({message: 'Get - wishlist route'}));
const { getWishlists, createWishlist, getWishlist, updateWishlist, deleteWishlist } = require('../controllers/wishlist.controller');

router.route('/')
.get(getWishlists) //obtener
.post(createWishlist); //Guardar

router.route('/:id')
.get(getWishlist)
.put(updateWishlist) // Actualizar
.delete(deleteWishlist); // eliminar

module.exports = router;