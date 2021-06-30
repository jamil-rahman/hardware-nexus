// const Joi = require('@hapi/joi');

// //registration validation

// const validation = (data, {pw, cf_pw}) => {
//     const schema = Joi.object({
//         name: Joi.string().required().trim(),
//         email: Joi.string().trim().required().email(),
//         hashed_password: Joi.string().required().min(6),
//     });
//     if(pw !== cf_pw) return "Passwords did not match"
//     return schema.validate(data);

//  }

const validation = (name, email, pw, cf_pw) => {
    if(!name || !email || !pw)
    return 'Please type in all required fields!'

    if(!validateEmail(email))
    return 'Invalid email!'

    if(pw.length < 6)
    return 'Password must be at least 6 characters long'

    if(pw !== cf_pw)
    return 'Passwords do not match!'
}


const validateEmail = (email)=> {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default validation;
