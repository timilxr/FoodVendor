const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    userEmail: {
        type: String,
        required: true,
        trim: 3,
        minlength: 11
    },
    content: {
        type: String,
        required: true,
        trim: 3,
        minlength: 2
    }
}, {
    timestamps: true
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;