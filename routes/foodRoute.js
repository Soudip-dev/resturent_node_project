const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/authMiddleware")
const { createFoodController, getFoodController, getSingleFoodController, getByResturantFoodController, updateFoodController,deleteFoodController } = require("../controller/foodController")

router.post('/create',authMiddleware, createFoodController )

router.get('/getAll', getFoodController)
router.get('/get/:id',  getSingleFoodController  )
router.get('/getByResturant/:id',  getByResturantFoodController  )
router.put('/update/:id',authMiddleware, updateFoodController)
router.delete('/delete/:id', authMiddleware, deleteFoodController )



module.exports = router;