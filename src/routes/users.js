const { Router } = require('express');
const router = Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const { getUsers, createUser, getUser, updateUser, deleteUser } = require('../controllers/user.controller');

router.route('/')
.get(getUsers)
.post(createUser);

router.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser);

module.exports = router;