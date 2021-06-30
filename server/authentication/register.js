import connectDB from "../utilities/dbConnection";
import Users from "../../server/models/userModel";
import validation from  "../utilities/validation";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) =>{
    switch(req.method){
        case "POST":
            await register(req,res)
            break;
    }
}

const register = async (req,res) => {
    try {
        const { name, email, pw, cf_pw} = req.body;
        
        const errorMsg = valid(name, email, pw, cf_pw);
        if(errorMsg) res.status(400).json({err: errorMsg});
        
        const passwordHash =  await bcrypt.hash(pw,12)
    
        //Users model creation successful? 
        const newUser = new Users({
             name, email, pw: passwordHash, cf_pw_
         });
         console.log(newUser);
         
         res.json({msg: "Registration Successful"})
    } catch (err) {
        return res.status(500).json({err: err.message});
        
    }
}