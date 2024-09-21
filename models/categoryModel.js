const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    
   title:{type: String, require:[true, "category title is require"]},
   imageUrl:{type: String, default: "https://i.postimg.cc/TPJTWmbr/onbording-image.png"},

}, { timestamps: true },)

module.exports = mongoose.model('category', categorySchema)


