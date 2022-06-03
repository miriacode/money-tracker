var mongoose = require('mongoose');
  
var imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    userId: String,
    // img:
    // {
    //     data: Buffer,
    //     contentType: String
    // },
    imageURL: String,
});
  
//Image is a model which has a schema imageSchema
module.exports = new mongoose.model('Image', imageSchema);