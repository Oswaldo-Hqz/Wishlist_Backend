const { Router } = require('express');
const router = Router();

const { getUsers, createUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/user.controller');

router.route('/')
.get(getUsers);

router.route('/Register')
.post(createUser);

router.route('/Login')
.post(loginUser);

router.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser);

module.exports = router;