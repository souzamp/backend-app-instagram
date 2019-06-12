const mongoose = require('mongoose');

/* uma representação da tabela para salvar os posts */
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes:{
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);