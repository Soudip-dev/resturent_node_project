const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
   
    title: { type: String, require: [true, "Food Title is require"] },
    foodTags: { type: String },
    category: { type: String },
    code: { type: String },
    isAvailabe: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        require:[true, 'food description is requir']
    },
    price: {
        type: Number,
      require:[true, "food price is require"]  
    },
    imageUrl: {
        type: String,
        default:"https://i.postimg.cc/TPJTWmbr/onbording-image.png"
    },
    
    resturant: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"resturant"
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max:5
    },
    ratingCount: {
        type:String
    }


},{timestamps:true})

module.exports= mongoose.model("food", foodSchema)