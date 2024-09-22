const express = require("express")
const { adminController } = require("../admin_controller/adminController")
const router = express.Router()


router.get('/admin', adminController)

module.exports = router