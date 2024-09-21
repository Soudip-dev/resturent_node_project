const foodModel = require("../models/foodModel");

const createFoodController = async (req, res) => {
    try {
        const { title,
foodTags,
category,
code,
isAvailabe,
description,
price,
imageUrl,
resturant,
rating,
            ratingCount } = req.body;
        
        if (!title  || !description || !price || !resturant ) {
            return res.status(500).send({
                success: false,
                massage: "Please Provide all fields"
            })
        }

        const newFood = new foodModel({ title,
foodTags,
category,
code,
isAvailabe,
description,
price,
imageUrl,
resturant,
rating,
            ratingCount
        })
        

        await newFood.save()
        res.status(201).send({
            success: true,
            message: "New food item Created",
            newFood
        })


        
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in Food Create API"
        })
    }
}
const getFoodController = async (req, res) => {
    try {
        const allFood = await foodModel.find({})
        if (!allFood) {
            return res.status(404).send({
                success: false,
                message:"Food items not found"
            })
        }
        res.status(200).send({
            success: true,
            allFoodCount: allFood.length,
            allFood
        })
    } catch (err) {
        console.log(err) 
        res.status(500).send({
            success: false,
            message:"Error in Get All Food API"
        })
    }
}

const getSingleFoodController = async (req, res) => {
    try {
        const foodId = req.params.id
        console.log(foodId, ">>>>>>>>>>>>>>>>>>")
         if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Id",
                
            })
        }
        const food = await foodModel.findById(foodId)
        
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found with hits id",
                
            })
        }

        res.status(200).send({
            success: true,
            
            food
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message:"Error in Get Single Food API"
        })
    }
}

const getByResturantFoodController = async (req, res) => {
    try {
        const resturantId = req.params.id
        
         if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide resturant Id",
                
            })
        }
        const food = await foodModel.find({resturant: resturantId})
        
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found with hits id",
                
            })
        }

        res.status(200).send({
            success: true,
            message:"Food base on Resturant",
            food
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message:"Error in Get Single Food API"
        })
    }
}

const updateFoodController = async (req, res) => {
    try {
        const foodId = req.params.id
        if (!foodId) {
            res.status(404).send({
                success: false,
                message: "Please provide id"
            })
        }
        const food = await foodModel.findById(foodId)

        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found"
            })
        }
        const { title,
foodTags,
category,
code,
isAvailabe,
description,
price,
imageUrl,
resturant,
rating,
            ratingCount } = req.body
        const updatedFood = await foodModel.findByIdAndUpdate(foodId, {title,
foodTags,
category,
code,
isAvailabe,
description,
price,
imageUrl,
resturant,
rating,
            ratingCount },{new:true})
        res.status(200).send({
            success: true,
            message: "Food updated successfully",
            updatedFood
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message:"Error in update food API"  
        })
    }
}
const deleteFoodController = async (req, res) => { 
    try {
        const foodId = req.params.id
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Food Id",

            })
        }
        const food = foodModel.findById(foodId)
        if (!food) {
            res.status(404).send({
                success: false,
                message:"Food not found"
            })
        }
        await foodModel.findByIdAndDelete(foodId)
        res.status(200).send({
            success: true,
            massage:"Food deleted Successfully"
        })
    } catch (err) {
        console.log(err) 
        res.status(500).send({
            success: false,
            message: "Error in delete API"
        })
    }
}


module.exports ={ createFoodController, getFoodController, updateFoodController, deleteFoodController, getSingleFoodController, getByResturantFoodController}