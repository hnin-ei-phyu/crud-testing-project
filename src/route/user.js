const mongojs = require("mongojs")
const express = require("express")
const db = mongojs("crud",["user"])
const collectionName = "user"
const router = express.Router()

router.get("/",(req,res)=>{
    db[collectionName].find({},(err,data)=>{
        if(err){
            res.status(500).json({msg: "Server Error"})
        }else if(!data){
            res.status(404).json({msg: "Data not found"})
        }else{
            res.status(200).json(data)
            console.log(data)
        }
    })
})

router.get("/get-One/:id",(req,res)=>{

    req.checkParams("id","Must be Mongo ID").isMongoId()

    let validationErrors = req.validationErrors()
    if(validationErrors) return res.status(400).json(validationErrors)

    db[collectionName].findOne({_id:mongojs.ObjectId(req.params.id)},(err,data)=>{
        if(err){
            res.status(500).json({msg: "Server Error "})
        }else if(!data){
            res.status(404).json({msg: "Data not found "})
        }else{
            res.status(200).json(data)
            console.log(data)
        }
    })
})

router.post("/create-user",(req,res)=>{
    req.checkBody("username","username should not be empty").notEmpty()
    req.checkBody("email","email should not be empty").notEmpty()
    req.checkBody("password","password shold not be empty").notEmpty()

    let validationErrors = req.validationErrors()
    if(validationErrors) return res.status(400).json(validationErrors)

    db[collectionName].insert(req.body,(err,data)=>{
        if(err){
            res.status(500).json({msg: "Server Error "})
        }else if(!data){
            res.status(404).json({msg: "Data not found "})
        }else{
            res.status(200).json({msg: "Created successfully !"})
        }
    })
}) 

router.put("/update-user/:id",(req,res)=>{

    req.checkParams("id","Must be Mongo Id").isMongoId()

    req.checkBody("username","username should not be empty").notEmpty()
    req.checkBody("email","email should not be empty").notEmpty()
    req.checkBody("password","password should not be empty").notEmpty()

    let validationErrors = req.validationErrors()
    if(validationErrors) return res.status(400).json(validationErrors)

    db[collectionName].update({_id:mongojs.ObjectId(req.params.id)},{$set: req.body},(err,data)=>{
        if(err){
            res.status(500).json({msg: "Server Error !"})
        }else if(!data){
            res.status(404).json({msg: "Data not found !"})
        }else{
            res.status(200).json({msg: "Updated Successfully !"})
        }

    })
})

router.delete("/delete-user/:id",(req,res)=>{

    req.checkParams("id","Must be Mongo Id").isMongoId()

    let validationErrors = req.validationErrors()
    if(validationErrors) return res.status(400).json(validatoinErrors)

    db[collectionName].remove({_id:mongojs.ObjectId(req.params.id)},(err,data)=>{
        if(err){
            res.status(500).json({msg: "Server Error !"})
        }else if(!data){
            res.status(404).json({msg: "Data not found"})
        }else{
            res.status(200).json({msg: "Deleted Successfully !"})
        }
    })
})

module.exports = router