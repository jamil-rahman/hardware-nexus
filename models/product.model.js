const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  image: {
    data: Buffer,
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: "Description is required"
  },
  category: {
    type: String
  },
  price: {
    type: String,
    required: "Price is required"
  },
})

// export default mongoose.model('Product', productSchema)
module.exports = mongoose.model("Product", productSchema);