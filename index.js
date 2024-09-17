const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const colors =require("colors")
const mongoose = require("mongoose")
const port = process.env.PORT  || 8080

app.listen(port, () => {
    console.log(`Server started at port ${port}`.bgYellow)
})
mongoose.connect("mongodb+srv://soudip19:I5zy623MVY4Rx4eU@cluster0.o5t0c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("DB Connected".bgMagenta)
}).catch((err) => {
    console.log(`Error is ${err}`)
})

// /////////////middleware>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
dotenv.config() 
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
// /////////////middleware>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>end


app.use('/api/v1/test', require("./routes/testRoute"))


app.get('/', ( req, res) => {
    return res.status(200).send(`<h1>Wellcome Soudip</h1>`)
})



