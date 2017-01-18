var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    mainimage: {type: String}
  
}, { collection: 'posts' })

module.exports = mongoose.model('Posts', postSchema);


