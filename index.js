const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const colors =require("colors")

const {connectDB}= require("./config/db")
const port = process.env.PORT  || 8080

app.listen(port, () => {
    console.log(`Server started at port ${port}`.bgYellow)
})

connectDB()


// /////////////middleware>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
dotenv.config() 
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
// /////////////middleware>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>end


app.use('/api/v1/test', require("./routes/testRoute"))
app.use('/api/v1/auth', require("./routes/authRoute"))
app.use('/api/v1/user', require("./routes/userRoute"))
app.use('/api/v1/resturant', require("./routes/resturantRoute"))
app.use('/api/v1/category', require("./routes/categoryRoute"))
app.use('/api/v1/food/', require("./routes/foodRoute"))


app.get('/', ( req, res) => {
    return res.status(200).send(`<h1>Wellcome Soudip</h1>`)
})



