const express = require("express")
const app = express()
const validator = require("express-validator")
const bodyParser = require("body-parser")

// admin router
const adminRouter = require("./src/route/admin")
//user router
const userRouter = require("./src/route/user")

const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(validator())

//admin router
app.use("/api/admin",adminRouter)
//user router
app.use("/api/user",userRouter)

app.listen(port,()=>{
    console.log("app is runing on port 3000")
})