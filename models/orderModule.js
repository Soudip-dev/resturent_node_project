const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    foods: [
        {
            type: mongoose.Schema.Types.ObjectId,
           ref:"food"
       }
    ],
    payment: {},
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    status: {
        type: String,
        enum: ['preparing', 'prerare', 'on the way', 'deliverd'],
        default:"preparing"
    }

},{timestamps:true})

module.exports= mongoose.model("food", foodSchema)