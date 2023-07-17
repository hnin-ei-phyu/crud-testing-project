const express = require("express")
const app = express()

const port = 3000

// app.get("/get",(req,res)=>{
//     res.send("hello .")
// })

app.listen(port,()=>{
    console.log("app is runing on port 3000")
})