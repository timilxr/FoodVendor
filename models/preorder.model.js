const mongoose = require('mongoose');
const { Schema } = mongoose;

const preorderSchema = new Schema({
    meal: {
        type: String,
        // of: Number,
        unique: true,
        required: true
    },
    quantity: {
        type: Number,
        // of: String,
        // default: 1,
        required: true
    }
}, {
    timestamps: true
});

const PreOrder = mongoose.model('PreOrder', preorderSchema);

module.exports = PreOrder;