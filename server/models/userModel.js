const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required!"
    },

    email:{
        type: String,
        trim: true,
        unique: "User with this Email already exists!",
        required: 'Email is required'
    },
    hashed_password: {
        type: String,
        required: "Password is required!",
        min: 6,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/hardware-nexus/image/upload/v1624901282/samples/people/avatardefault_o5cpgq.png'
    }

    

},{
    timestamps: true
});
let Dataset = mongoose.models.user || mongoose.model('User', userSchema)

export default Dataset;