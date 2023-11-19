const express = require("express")
const validation = require("../middelware/validateUser")
const {getContacts, getContactsById, postContact ,updateContactById, deleteContactById} = require( "../controllers/contactController")
const router = express.Router();

const middel = (req, res, next) => {
    console.log("firstCalled")
    next()
}

router.use(validation)


router.get("/" ,getContacts)
router.get('/:id', getContactsById) // method 1
router.route("/").post(postContact)// method 2
router.route("/:id").put(updateContactById)
router.delete("/:id", deleteContactById)



module.exports = router
