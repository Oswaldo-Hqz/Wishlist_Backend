const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const userModel = require('../models/user');

const userController = {};


userController.getUsers = async (req, res) => {
    const users = await userModel.find();

    res.json(users);
};

userController.createUser = async (req, res) => {

    try {
        const { errors, isValid } = validateRegisterInput(req.body);
        const { name, email, password } = req.body;
        
        // Check validation
        if (!isValid) {
            res.status(400).json(errors);
        }
        const user = await userModel.findOne({ email: req.body.email });
        
        if (user) {
            res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new userModel({
                name: name,
                email: email,
                password: password
            });
            
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
        
    } catch (error) {
        res.status(400).json(error);
    }
    
}; 

userController.loginUser = async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    const { name, email, password } = req.body;

    if (!isValid) {
        res.status(400).json(errors);
    };

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
        res.status(404).json({ emailnotfound: "Email not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
            id: user.id,
            name: user.name
        };

        jwt.sign(payload, process.env.SECRETORKEY, { expiresIn: 31556926 /* 1 year in seconds*/ }, (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
        });
    } else {
        res.status(400).json({ passwordincorrect: "Password incorrect" });
    }

};

userController.getUser = async (req, res) => {
    const user = await userModel.findById(req.params.id);

    res.json(user);
};

userController.updateUser = async (req, res) => {
    const { username } = req.body;
    await userModel.findOneAndUpdate({_id: req.params.id }, {
        username
    });

    res.json({message: 'Actualizado!'});
};

userController.deleteUser = async (req, res) => {
    await userModel.findByIdAndDelete(req.params.id);
    
    res.json({message: 'Eliminado!'});
}; 


module.exports = userController;
