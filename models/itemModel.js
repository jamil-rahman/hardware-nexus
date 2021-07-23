const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    available:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});
// let Dataset = mongoose.models.Item || mongoose.model('item', itemSchema)

// export default Dataset;

export default (mongoose.models && mongoose.models.Item
    ? mongoose.models.Item
    : mongoose.model('Item', itemSchema));