import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "PATCH":
            await uploadInformation(req, res)
            break;
    }
}

const uploadInformation = async (req, res) => {
    try {
        const result = await auth(req, res)
        const {name, avatar} = req.body

        const newUser = await Users.findOneAndUpdate({_id: result.id}, {name, avatar})

        res.json({
            msg: "Image uploaded succesfully",
            user: {
                name,
                avatar,
                email: newUser.email,
            }
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}