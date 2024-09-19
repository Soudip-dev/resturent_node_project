 const mongoose = require("mongoose")
const colors = require("colors")


// mongoose.connect("mongodb+srv://soudip19:I5zy623MVY4Rx4eU@cluster0.o5t0c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
//     console.log("DB Connected".bgMagenta)
// }).catch((err) => {
//     console.log(`Error is ${err}`)
// })

const connectDB = async() => {
    try {

        await mongoose.connect(`mongodb+srv://soudip19:I5zy623MVY4Rx4eU@cluster0.o5t0c.mongodb.net/resturant-app`)
      console.log(`Connected to Data Base>>>> ${mongoose.connection.host}`.bgMagenta)
        
    } catch (err) {
        console.log(`Error is ${err}`.bgRed)
    }
}

module.exports={connectDB}