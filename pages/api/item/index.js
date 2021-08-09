import connectDB from '../../../utils/connectDB'
import Items from '../../../models/itemModel'

connectDB()

export default async(req,res) =>{
    switch(req.method){
        case "GET":
            await getItems(req,res);
            break;
        case "POST":
            await createItem(req, res)
            break;
    }
}
// create post api
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


const createItem = async (req, res) => {
    try {
        // const result = await auth(req, res)
        // if(result.role !== 'admin') return res.status(400).json({err: 'Authentication is not valid.'})

        const {title, price, memory, location, description, brand, category, images, contact_number, creatorAt} = req.body

        if(!title || !price  || !description || !location || !contact_number || images.length === 0)
        return res.status(400).json({err: 'Please add all the required fields.'})


        const newItem = new Items({
            title: title.toLowerCase(), price, memory, location, description, brand, category, images, contact_number, creatorAt
        })

        await newItem.save()

        res.json({msg: 'Success! Your Ad was succesfully posted!'})

    } catch (err) {
        return res.status(500).json({err: err.message})
        console.log(err)
    }
}