const jwt = require("jsonwebtoken")

const validation = async (req, res, next) => {
    try {
        if (req.headers.authorization || req.headers.Authorization) {
            const authToken = req.headers.authorization
            const token = authToken.split(" ")[1]
            
            jwt.verify(token, process.env.secreat_token, async(err, decoded) =>{
              if(err){
                res.status(400).json({error:"token is not verified!"})
              }else{
                req.user = decoded
                next()
              }
            })

        } else{
            res.status(400).json({error:"not authorized"})
        }
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}

module.exports = validation