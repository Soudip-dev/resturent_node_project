const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const { createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController } = require("../controller/categoryController")

const router = express.Router()

router.post("/create", authMiddleware, createCategoryController)

router.get("/getAll", getAllCategoryController)

router.put('/update/:id', authMiddleware, updateCategoryController)

router.delete('/delete/:id', authMiddleware, deleteCategoryController)

module.exports =router