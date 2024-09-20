const resturantModel = require("../models/resturantModel")

const createResturantController = async (req,res) => {
    try {
        const { title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords, } = req.body
        if (!title ) {
            return res.status(500).send({
               success: false,
            message: "Please Provide title",
             
            })
        }
        const newResturant = new resturantModel({
            title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords,
        });
        await newResturant.save();
        res.status(201).send({
            success: true,
            message: "New Resturant Created Successfully",
            newResturant
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in crate resturant API",
            err
        })
    }
}

const getAllResturantController = async (req, res) => {
    try {
        console.log("call form get controller>>>>>>>>>>>>")
        const resturants = await resturantModel.find({})
        if (!resturants) {
            return res.status(404).send({
                success: false,
                message: "No Resturant Available"
            })
        }
        res.status(200).send({
            success: true,
            totalCount: resturants.length,
            resturants
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error In Get All Resturant API",
            err
        })

    }
}


const getResturantByIdController = async (req, res) => {
    try {
        const resturantId = req.params.id
        if (!resturantId) {
            return res.status(404).send({
                success: false,
                message:"Please Provide Resturant Id"
            })
        }
        const resturant = await resturantModel.findById(resturantId)
        if (!resturant) {
            return res.status(404).send({
                success: false,
                message: "No resturant found"
            })
        }
        res.status(200).send({
            success: true,
            resturant
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error In Get Resturant By Id API",
            err
        })
    }
}


const deleteResturantController = async (req, res) => {
    try {
        
        const resturantId = req.params.id
        if (!resturantId) {
            return res.status(500).send({
                success: false,
                message: "Please Provide resturant id"
            })
        }

         if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: "Resturant Id not found"
            })
         }
        
        await resturantModel.findByIdAndDelete(resturantId) 

        res.status(200).send({
            success: true,
            message: "Resturant Deleted Successfully"
        })




    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in resturant delete API"
        })
     }
}

module.exports ={createResturantController, getAllResturantController, getResturantByIdController, deleteResturantController }