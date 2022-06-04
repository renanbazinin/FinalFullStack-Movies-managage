const express = require("express");
const router = express.Router()
const subBL = require("../services/subServices")
router.route("/").get( async (req,res) =>{


    const data = await subBL.getAllSubs()
    return res.json(data)
})

router.route("/:id").get( async (req,res)=>{

    try{
    const id = req.params.id
    const obj = await subBL.getSubsById(id)
    return res.json(obj)
    }
    catch(err){
        return res.json("FAILD")
    }
})

router.route("/").post(async (req,res)=>{
  
   const sub = req.body;
   
   await subBL.addMember(sub) 

  
})

router.route("/:id").put(async (req,res)=>{
    console.log("put")
    const id = req.params.id//the param catch in url
    const sub = req.body
    const obj = await subBL.updateSubs(id,sub)
 
    
    return res.json(obj)
 })

 router.route("/:id").delete(async (req,res)=>{
   
    try{
    const id = req.params.id//the param catch in url
    await subBL.deleteSubs(id)
    return res.json()
    }
    catch(err){
        return res.json("FAILD")
    }
 })



module.exports = router;