const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, // Store image URL instead of binary data
        required: true
    }
});

module.exports = mongoose.model('Movie', movieSchema);
