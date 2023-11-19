const mongoose = require("mongoose")

const dbConnection = async() => {
    try{
        const connect= await mongoose.connect(process.env.mongodb_url)
        console.log(`Connection success host:${connect.connection.host} and name:${connect.connection.name}` )

    } catch (e) {
        console.log("issue while connecting", e.message)
        process.exit(1)
    }
    

}

module.exports = dbConnection