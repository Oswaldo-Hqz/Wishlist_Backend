const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput (data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPass = !isEmpty (data.confirmPass) ? data.confirmPass : "";

    if (validator.isEmpty(data.name)) {
        errors.name = "El nombre es requerido";
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Email es requerido";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email no es valido"
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password es requerida";
    } else if (!validator.isLength(data.password, {min: 6, max: 15})) {
        errors.password = "Password debe tener un minimo de 6 caracteres";
    }

    if (validator.isEmpty(data.confirmPass)) {
        errors.confirmPass = "Confirmar la Password es requerida";
    }

    if (!validator.equals(data.password, data.confirmPass)) {
        errors.confirmPass = "No coincide con la password";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };

};
