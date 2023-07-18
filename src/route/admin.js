const mongojs = require("mongojs")
const express = require("express") 
const db = mongojs("crud",["admin"])
const router = express.Router()


router.get("/",function(req,res){

    db.admin.find({},function(err,data){
        if(err){
            res.status(500).json({msg:"Server Error"})
        }else if(!data){
            res.status(404).json({msg:"Data not found"})
        }else{
            res.status(200).json(data)
            console.log(data)
        }
    })
})

router.get("/get-with-id/:id",function(req,res){

    req.checkParams("id","Must be Mongo Id").isMongoId()

    let validationErrors = req.validationErrors()
    if(validationErrors) return res.status(400).json(validationErrors)
    
    db.admin.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,data){
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

router.post("/create-admin",(req,res)=>{

    req.checkBody("username","username should not be empty").notEmpty()
    req.checkBody("password","password should not be empty").notEmpty()
    req.checkBody("role","role should not be empty").notEmpty()

    req.body.createdAt = new Date()

    let validationErrors = req.validationErrors()
    if(validationErrors) return res.status(400).json(validationErrors)

    db.admin.insert(req.body,(err,data)=>{
        if(err){
            console.log("here")
            res.status(500).json({msg: "Server Error ."})
        }else if(!data){
            res.status(404).json({msg: "Data not found ."})
        }else{
            res.status(200).json({msg : "Successfully Created !"});
        }
    })
})

router.put("/update-admin/:id",(req,res)=>{

    req.checkParams("id","Must be Mongo Id").isMongoId()

    req.checkBody("username","username should not be empty").notEmpty()
    req.checkBody("password","password shuold not be empty").notEmpty()
    req.checkBody("role","role should not be empty").notEmpty()

    req.body.updatedAt = new Date()

    let validationErrors = req.validationErrors()
    if(validationErrors) return res.status(400).json(validationErrors)

    db.admin.update({_id:mongojs.ObjectID(req.params.id)},{$set: req.body},(err,data)=>{
        if(err){
            res.status(500).json({msg: "Server Error"})
        }else if(!data){
            res.status(404).json({msg: "Data not Found"})
        }else{
            res.status(200).json({msg: "Successfully Updated !"})
        }
    })
})

router.delete("/delete-admin/:id",(req,res)=>{
    req.checkParams("id","Must be Mongo ID ").isMongoId()

    let validationErrors = req.validationErrors()
    if(validationErrors) return res.status(400).json(validationErrors)

    db.admin.remove({_id:mongojs.ObjectId(req.params.id)},(err,data)=>{

        if(err){
            res.status(500).json({msg: "Server Error"})
        }else if(!data){
            res.status(404).json({msg: "data not found"})
        }else{
            res.status(200).json({msg: "Deleted Successfully !"})
        }

    })
})

module.exports = router

