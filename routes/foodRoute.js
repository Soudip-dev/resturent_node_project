const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/authMiddleware")
const adminMiddleware = require("../middlewares/adminMiddleware")
const { createFoodController, getFoodController, getSingleFoodController, getByResturantFoodController, updateFoodController,deleteFoodController, placeOrderController, orderStatusController } = require("../controller/foodController")

router.post('/create',authMiddleware, createFoodController )

router.get('/getAll', getFoodController)
router.get('/get/:id',  getSingleFoodController  )
router.get('/getByResturant/:id',  getByResturantFoodController  )
router.put('/update/:id',authMiddleware, updateFoodController)
router.delete('/delete/:id', authMiddleware, deleteFoodController)

router.post('/placeorder', authMiddleware, placeOrderController)

router.post('/orderStatus/:id', adminMiddleware, authMiddleware, orderStatusController)



module.exports = router;