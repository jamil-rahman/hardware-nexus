const Joi = require('@hapi/joi');

const registrationValidation = data =>{
    const schema = Joi.object({
        name: Joi.string().min(6).max(18).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
        return schema.validate(data);
    };

const validateLogin = data =>{
    const schema = Joi.object({
        // username: Joi.string().min(6).max(18).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    });
        return schema.validate(data);
    };


// const validateEmail = (email)=> {
//     const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
// }

module.exports.registrationValidation = registrationValidation;
module.exports.validateLogin = validateLogin;