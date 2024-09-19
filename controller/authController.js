const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")

const registerController = async (req, res) => { 

     try {
        const { userName, email, password, phoneNo, address, usertype, profile, answer } = req.body
        if (!userName || !email || !password || !phoneNo || !address || !answer) {
            return res.status(500).send({
                success: false,
                message:"Please Provide All Fields"
                
            })
        }

        const existingEmail = await userModel.findOne({ email }) 
        if (existingEmail) {
            return res.status(500).send({
                success: false,
                message: "Email Already Registered, user another one"
            })
        }
         
         const existingPhoneNo = await userModel.findOne({ phoneNo })
         if (existingPhoneNo) {
             return res.status(500).send({
                 success: false,
                 message :"Phone number Already Registered"
             })
         }

         var salt = bcrypt.genSaltSync(10)

         const hashedPassword = await bcrypt.hash(password, salt)


        const user = await userModel.create({ userName, email, password : hashedPassword, address, phoneNo,usertype, profile, answer })
        res.status(201).send({
            success: true,
            message: "Successfully Registered",
            user
        })
        
    } catch(err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error In Register API",
            err
        })
    }
   
}

const loginController =async (req, res) => {
    try {
        
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(500).send({
                success: false,
                message: "Please Provied Email and Password"
            })
        }

        // const checkUser = await userModel.findOne({ email:email,password:password })
        const checkUser = await userModel.findOne({ email })
        
        if (!checkUser) {
            return res.status(404).send({
                success: false,
                message : "User not found "
            })
        }

        const isMatch = await bcrypt.compare(password, checkUser.password)
        
        if (!isMatch) {
            return res.status(404).send({
                success: false,
                message: "Invalid credentials"
            })
        }
        
        const token = JWT.sign({id:checkUser._id},"JWT_SECRET_MYVALUE",{expiresIn: "7d"})

        checkUser.password = undefined
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            checkUser
        
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error In Loging API",
            err
        })
    }
}


module.exports = {registerController, loginController}