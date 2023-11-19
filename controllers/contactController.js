const { json } = require("express");
const Contact = require("../models/contactModel")

//get all contacts details api
const getContacts = async (req, res) => {
    try {
        
        const contactDetails = await Contact.find({ user_id: req.user.id });
        res.status(200).json({ userData: contactDetails })

    } catch (e) {
        res.status(401).json({ erro: e.message })
    }
}


//api by id

const getContactsById = async (req, res) => {
    try {
        const userDetail = await Contact.findById(req.params.id)

        if (!userDetail) {
            res.status(400).json({ error: "Not found" })
        }
        else {
            if (userDetail.user_id.toString() === req.user.id) {
                res.status(200).json(userDetail)
            } else {
                res.status(400).json({ error: "user is not authorized" })
            }
        }

    } catch (e) {
        res.status(400).json(e.message)
    }
}
//post new contactDetails api
const postContact = async (req, res) => {

    try {
        const body = req.body
        const { name, email, phoneNumber } = body
        if (!name || !email || !phoneNumber) {
            res.status(400).res.send("all fields are needed")
        }
        else {
            const detailUnique = await Contact.findOne({email})
            if (!detailUnique) {
                const update = await Contact.create({
                    user_id: req.user.id,
                    name,
                    email,
                    phoneNumber
                })
                res.status(200).send("Contact created successfully")
            } else {
                res.status(400).json({ error: "details already saved" })
            }

        }
    } catch (e) {
        console.log(e.message)
    }
}

//updtae by id api
const updateContactById = async (req, res) => {

    try {
        const body = req.body
        const checkId = await Contact.findById(req.params.id);
        if (!checkId) {
            res.status(400).send({ error: "no data with this id is found" })
        } else {
            if (checkId.user_id.toString() === req.user.id) {
                const updatedContact = await Contact.findByIdAndUpdate(req.params.id, body, { new: true })
                res.status(200).json(updatedContact)
            } else {
                res.status(400).json({ error: "user is not authorized to Update" })
            }

        }
    } catch (e) {
        console.log(e.message)
    }

}

//delete by id api

const deleteContactById = async (req, res) => {
    try {
        
        const check = await Contact.findById(req.params.id);
        if (!check) {
            res.status(404).send("no data with this id")
        } else {
            if(check.user_id.toString() === req.user.id){
                const deleteRes = await Contact.findByIdAndDelete(req.params.id);
                res.status(200).json({mesg:"Contact deleted successfully"})
            }else{
                res.status(400).json({error:"user is ot authorized"})
            } 
        }
    } catch (e) {
        res.status(400).json(e.message)
    }
}

module.exports = { getContacts, getContactsById, postContact, updateContactById, deleteContactById }