const mongoose = require("mongoose")

const userSchema =  new mongoose.Schema({
    userName: {type:String, require :[true, "user name is reqired"]},
    email: {type:String, require :[true, "user email is reqired"], unique:true},
    password: {type:String, require :[true, "user password is reqired"] },
    address: {type:Array, },
    phoneNo: {type:String, require :[true, "user phone number is reqired"], unique:true},
    usertype: { type: String, enum: ['admin', 'clinet', 'common'],default :"clinet"  },
    profile: { type: String, default: "https://i.postimg.cc/LX9g3QWC/blank-image.webp" },
    answer: { type: String, require: [true, "Answer is required"]}
    

    
}, { timestamps: true },)

module.exports =mongoose.model('user', userSchema)