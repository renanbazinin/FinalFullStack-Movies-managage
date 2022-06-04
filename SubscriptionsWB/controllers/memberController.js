const express = require("express");
const router = express.Router()
const memberBL = require("../services/membersServices")
router.route("/").get( async (req,res) =>{


    const data = await memberBL.getAllMembers()
    return res.json(data)
})

router.route("/:id").get( async (req,res)=>{

    const id = req.params.id
    const obj = await memberBL.getMembersById(id)
    return res.json(obj)
})

router.route("/").post(async (req,res)=>{
  try{
   const movie = req.body;
   
   const respon = await memberBL.addMember(movie) 
   return res.json(respon)
  }
  catch(err){
    return res.json(err)
 }
})

router.route("/:id").put(async (req,res)=>{
    console.log("put")
    const id = req.params.id//the param catch in url
    const member = req.body
    const obj = await memberBL.updateMembers(id,member)
 
    
    return res.json(obj)
 })

 router.route("/:id").delete(async (req,res)=>{
   
    const id = req.params.id//the param catch in url
    await memberBL.deleteMembers(id)
    return res.json()
 })



module.exports = router;