const express = require("express")
const app = express()
const validator = require("express-validator")
const bodyParser = require("body-parser")

// router
const adminRouter = require("./src/route/admin")

const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(validator())

app.use("/api/admin",adminRouter)


app.listen(port,()=>{
    console.log("app is runing on port 3000")
})