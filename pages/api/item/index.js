import connectDB from '../../../utils/connectDB'
import Items from '../../../models/itemModel'

connectDB()

export default async(req,res) =>{
    switch(req.method){
        case "GET":
            await getItems(req,res);
            break;
    }
}

const getItems = async(req,res) => {
    try {
        const items = await Items.find()
        
        res.json({
            status:"success",
            result: items.length,
            items
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }

}