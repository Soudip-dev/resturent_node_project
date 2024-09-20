const express = require("express")

const router = express.Router()

const authMiddleware = require("../middlewares/authMiddleware")
const { createResturantController, getAllResturantController, getResturantByIdController, deleteResturantController } = require("../controller/resturantController")

router.post("/create", authMiddleware, createResturantController)

router.get("/getAll", getAllResturantController)

router.get("/get/:id", getResturantByIdController)

router.delete("/delete/:id", authMiddleware, deleteResturantController)


module.exports= router