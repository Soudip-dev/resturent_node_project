const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")

const getUserController = async (req, res) => {
    // res.status(200).send("User Data")
    // console.log(req.body.id)
    try {

        const user = await userModel.findById({ _id: req.body.id },{_id:0})
        
        if (!user) {
            return res.status(404).send({
                success: false,
                message:"User Not Found"
            })
        }

        user.password = undefined
        res.status(200).send({
            success: true,
            message: "User data get Successfully",
            user
        })

        
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in Get User API",
            err
        })
    }
}

const updateUserController = async(req, res) => {
    try {

        const user = await userModel.findById({ _id: req.body.id })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user not found"
            })
        }

        const { userName, address, phoneNo } = req.body
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phoneNo) user.phoneNo = phoneNo
        
        await user.save()
        res.status(200).send({
            success: true,
            message: "User Updated Successfully"
        })


        
    } catch (err) {
        console.log(err) 
        res.status(500).send({
            success: false,
            message:'Error in update-User API'
        })
    }
}

const updatePasswordController = async (req, res) => {
    try {
       const user = await userModel.findById({_id:req.body.id})
        
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }
        
        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Please Provied Old or New Password"
            })
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid old Password"
            })
        }

        var salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success: true,
            message: "Passouwrd Updated Successfully"
        });
        
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in password update API",
            err
        })
    }
}

const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: "Please Provide All Fields"
            })
        }
        const user = await userModel.findOne({ email, answer })
        
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User Not Found or invalid answer"
            })
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        user.password = hashedPassword
        user.save()

        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })


    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in PASSWORD RESET API",

        })
    }
}

const deleteProfileController =async (req, res) => {
    try {
        // console.log(req.params.id,">>>>>>>>>>>>>>>>>>>>..")
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message:"Your account has deleted"
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error In Delete Profile API"
        })
    }
}

module.exports ={getUserController, updateUserController, updatePasswordController,resetPasswordController, deleteProfileController,}