const express = require("express")
const vadidation = require("../middelWare/validateUser")

const {userLogin, userRegister, correntUser} = require("../controllers/userControlleer")

const router = express.Router()

router.post("/register", userRegister)

router.post("/login", userLogin)

router.get("/curent", correntUser)


module.exports = router