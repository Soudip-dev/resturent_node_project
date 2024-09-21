const categoryModel = require("../models/categoryModel")

const createCategoryController = async (req, res) => {
    try {
   
        const { title, imageUrl } = req.body
        if (!title ) {
            return res.status(500).send({
                success: false,
                message:"Please Provide title and image url"
            })
        }
        const newCategory = new categoryModel({ title, imageUrl })
        
        await newCategory.save()

        res.status(201).send({
            success: true,
            message: "Category created successfully",
            newCategory
        })
       
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error In Create Category API",
            err
        })
   }
}

const getAllCategoryController = async (req, res) => {
    try {
          
        const allCategory = await categoryModel.find({})
        
        if (!allCategory) {
            return res.status(404).send({
                success: false,
                message:"No Categorye Found"
            })
        }

        res.status(200).send({
            success: true,
            totalCategory: allCategory.length,
            allCategory
            
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in Get All Category API",
            err
        })
      }
}

const updateCategoryController = async (req, res) => {
    try {
         
        const { id } = req.params
        const { title, imageUrl } = req.body
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, {title, imageUrl}, {new: true})
        
        
        if (!updatedCategory) {
            res.status(500).send({
                success: false,
                message: "Category id not found"
            })
        }

        res.status(200).send({
            success: true,
            message: "Category updated Successfully",
            data: updatedCategory
        })
     


    } catch (err) {
        console.log(err) 
        res.status(500).send({
            success: false,
            message:"Error in category update API"
        })
    }
}

const deleteCategoryController = async (req, res) => {
     
    try {
        const { id } = req.params
        if (!id) {
            return res.status(500).send({
                success: false,
                message: "Error in delete Category API",

            })
        }
        const category = await categoryModel.findById(id)
        if (!category) {
            return res.status(500).send({
                success: false,
                message: "No Category found"
            })
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Category deteted successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in category delete API"
        })
    }

}

module.exports = {createCategoryController, getAllCategoryController, updateCategoryController,deleteCategoryController}