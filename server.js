const express = require("express");
const dbConnection = require("./config/dbConnection");




const dotenv = require("dotenv").config()

const app = express();

app.use(express.json())

const port  =  3000 || process.env.PORT

app.listen(port , () => {
    console.log(`listening to port ${port} .....`)
})

app.use("/api/contact", require("./routes/contactRoutes") )
app.use("/api/user", require("./routes/userRoute"))



dbConnection()