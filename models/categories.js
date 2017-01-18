var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var categoriesSchema = new Schema({
    catname: { type: String, required: true }

}, { collection: 'categories' })

module.exports = mongoose.model('Categories', categoriesSchema);

