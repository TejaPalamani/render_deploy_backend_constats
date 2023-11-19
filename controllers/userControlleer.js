const { json } = require("express");
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")


const User = require("../models/userModel")

const userRegister = async(req, res) => {
    try{
        const {name, password, email} = req.body
        if(!name || !password || !email) {
            res.status(400).json({error:"all fields are madatory!"})
        }else{
            const userExists = await User.findOne({email})
           
            if(!userExists){
                const hashedPassword = await bcrypt.hash(password, 10)

                const responce = await User.create({
                    name,
                    email,
                    password:hashedPassword,
                })

                res.status(201).json({mesg:"user successfully Created"})

            }else{
                res.status(400).json({error:"user already exits"})
            }
        }
    } catch(e){
        res.status(400).json({error:e.message})
        console.log(e.message)
    }

}

const userLogin = async(req, res) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            res.status(400).json({error:"email and password are required!"})
        }else{
            const checkUser = await User.findOne({email});
            if(!checkUser){
                res.status(400).json({error:"user is not registered!"})
            }else{
                const compare = await bcrypt.compare(password, checkUser.password)
                if(compare){
                    //jwt contains sign (payload, screatToken, {expires:min to hours})
                    const payload = {
                        name:checkUser.name,
                        id :checkUser.id,
                        email:checkUser.email
                    }
                    const accessToken = await jwt.sign(payload, process.env.secreat_token, {expiresIn:"56m"})
                    res.status(200).json({accessToken:accessToken})
                }else{
                    res.status(400).json({error:"password wrong!"})
                }
            }

        }

    }catch(e){
        res.status(400).json({error:e.message})
    }
}

const correntUser = async(req, res) => {
    try{
        const userall = await User.find()

        res.status(200).json(userall)

    }catch(e){
        res.status(400).json({error:e.message})
    }
}

module.exports = {userLogin, userRegister, correntUser}