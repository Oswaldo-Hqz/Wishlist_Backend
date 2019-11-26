const bcrypt = require("bcryptjs");

const userController = {};
/*
userController.getUsers = (req, res) => res.json({message: []});

userController.createUser = (req, res) => res.json({message: 'method POST'}); 

userController.getUser = (req, res) => res.json({message: 'method GET:id'});

userController.updateUser = (req, res) => res.json({message: 'method UPDATE:id'});

userController.deleteUser = (req, res) => res.json({message: 'method DELETE:id'}); 
*/

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const userModel = require('../models/user');

userController.getUsers = async (req, res) => {
    const users = await userModel.find();

    res.json(users);
    };

    userController.createUser = async (req, res) => {
    // const { username } = req.body;
    // const newUser = new userModel({
    //     username
    // });   
    // await newUser.save();
    
    // res.json({message: 'Guardado!'})

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
            const newUser = new User({
                name: name,
                email: email,
                password: password
            });
    
            //Hash password before saving in database
            // bcrypt.genSalt(10, (err, salt) => {
            //     bcrypt.hash(newUser.password, salt, (err, hash) => {
            //         if (err) throw err;
            //         newUser.password = hash;
            //         newUser
            //             .save()
            //             .then(user => res.json(user))
            //             .catch(err => console.log(err));
            //     });
            // });
            res.json({message: 'Guardado!'})
        }
        
    } catch (error) {
        next(error);
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