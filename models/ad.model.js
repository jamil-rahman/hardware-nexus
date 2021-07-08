const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {    
        type: Date,
        default: Date.now
    },
    comments: [{
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
      }],
    body: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    price: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  
},{timestamps: true});

module.exports = mongoose.model('Ad', adSchema);