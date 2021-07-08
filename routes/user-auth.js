const router = require('express').Router();
const User = require('../models/user.model');
const {registrationValidation} = require('../utils/validation'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//create a new user
router.post('/register', async(req,res) => {
    //validation before registration
    //const { name, email, password, cf_pw } = req.body
    const {error} = registrationValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
   try{
    //check if user already exists
    const existingEmail = await User.findOne({email:req.body.email});
    if(existingEmail) res.status(400).send("Email already exists!");

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        // _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        // cf_pw : req.body.cf_pw
    });

        const savedUser = await user.save();
        console.log(savedUser);
        res.json(savedUser);
       // res.send({user: user._id});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error});
    }

});


//Login route
router.post('/login',async (req,res)=>{
    //validation before registration
    const {error} = validateLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);

     //check if user already exists
    const user = await User.findOne({email: req.body.email});
    if(!user) res.status(400).send("User already exists");

    //Password validation
    const validatedPass = await bcrypt.compare(req.body.password, user.password);
    if(!validatedPass) return res.status(400).send("Invalid Password");

    //creating and assign a session token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);

    // res.send('Log In Success');

});

module.exports = router;