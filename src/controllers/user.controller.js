const userController = {};
/*
userController.getUsers = (req, res) => res.json({message: []});

userController.createUser = (req, res) => res.json({message: 'method POST'}); 

userController.getUser = (req, res) => res.json({message: 'method GET:id'});

userController.updateUser = (req, res) => res.json({message: 'method UPDATE:id'});

userController.deleteUser = (req, res) => res.json({message: 'method DELETE:id'}); 
*/


const userModel = require('../models/user');

userController.getUsers = async (req, res) => {
    const users = await userModel.find();

    res.json(users);
    };

    userController.createUser = async (req, res) => {
    const { username } = req.body;
    const newUser = new userModel({
        username
    });   
    await newUser.save();
    
    res.json({message: 'Guardado!'})
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