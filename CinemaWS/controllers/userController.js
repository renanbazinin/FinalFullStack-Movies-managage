const express = require("express");
const router = express.Router()
const userBL = require("../services/usersServices")



router.route("/").get( async (req,res) =>{

    console.log("here get all")
    const data = await userBL.getAllUsers()
    return res.json(data)
})

router.route("/userfile").get( async (req,res) =>{
    const urlfile = "./JSON/Users.json"
    console.log("here get all but from json")
    const data = await userBL.userJSONRead(urlfile)

    return res.json(data)
})

router.route("/permissionsfile").get( async (req,res) =>{
    const urlfile = "./JSON/permissions.json"
    console.log("here get all permissions but from json")
    const data = await userBL.userJSONRead(urlfile)
    return res.json(data)
})

router.route("/permissionsfile/:id").get( async (req,res) =>{
    try{
    const id = req.params.id
    const urlfile = "./JSON/permissions.json"
    console.log("here get prems by id")
    const data = await userBL.userJSONReadById(id,urlfile)
    return res.json(data)
    }
    catch(err){
        return res.json(err)
     }
})

router.route("/userfile/:id").get( async (req,res) =>{
    try{
    const id = req.params.id
    const urlfile = "./JSON/Users.json"
    console.log("here get userJSON by id")
    const data = await userBL.userJSONReadById(id,urlfile)
    return res.json(data)
    }
    catch(err){
        return res.json(err)
     }
})

router.route("/:id").get( async (req,res)=>{
    try{
    const id = req.params.id
    const obj = await userBL.getUsersById(id)
    return res.json(obj)
    }
    catch(err){
        return res.json(err)
     }
})

router.route("/").post(async (req,res)=>{
  
   const user = req.body;
   
   const dataReturn = await userBL.addUser(user) 
   return res.json(dataReturn)
    
  
})


router.route("/userfile").post( async (req,res) =>{
    const newUpdate = req.body;
    //const id = req.params.id

    const urlfile = "./JSON/Users.json"
    console.log("here get all but from json")
    const data = await userBL.userJSONAdd(newUpdate,urlfile)
    return res.json(data)
})

router.route("/permissionsfile").post( async (req,res) =>{
    try{
    const newUpdate = req.body;
    //const id = req.params.id

    const urlfile = "./JSON/permissions.json"
    console.log("here get all but from json")
    const data = await userBL.userJSONAdd(newUpdate,urlfile)
    return res.json(data)
    }
    catch(err){
        return res.json(err)
     }
})

router.route("/userfile").put( async (req,res) =>{
    const newUpdate = req.body;
    //const id = req.params.id

    const urlfile = "./JSON/Users.json"
    console.log("here get all but from json")
    const data = await userBL.userJSONUpdate(newUpdate,urlfile)
    return res.json(data)
})

router.route("/permissionsfile").put( async (req,res) =>{
    const newUpdate = req.body;
    const urlfile = "./JSON/permissions.json"
    console.log("here get all permissions but from json")
    const data = await userBL.userJSONUpdate(newUpdate,urlfile)
    return res.json(data)
})

router.route("/:id").put(async (req,res)=>{
    try{
    console.log("put")
    const id = req.params.id//the param catch in url
    const Users = req.body
    const obj = await userBL.updateUsers(id,Users)
    return res.json(obj)
    }
    catch(err){
        return res.json(err)
    }
 })

 router.route("/userfile/:id").delete(async (req,res)=>{
    try{
    const urlfile = "./JSON/Users.json"
    const id = req.params.id//the param catch in url
    const res2 = await userBL.deleteUserJson(id,urlfile)
    return res.json(res2)
    }
    catch(err){
    return res.json(err)
    }
 })
/////Restart serveaer
/////Restart serveaer
/////Restart serveaer userDB delete and put admin
 router.route("/deleteAll").delete(async (req,res)=>{
    try{
        let resDet1;
        let resDet2;
        let urlfile = "./JSON/Users.json"
        const data = await userBL.getAllUsers()
        
        //await Promise.all(data.forEach(async(user,i)=>{

     
            
             urlfile = "./JSON/Users.json"
             resDet1 = await userBL.deleteUserJsonAll(urlfile)
             console.log(resDet1)
             urlfile = "./JSON/permissions.json"
             resDet2 = await userBL.deleteUserJsonAll(urlfile)
           
        //}))
        console.log("AfterJSon delete")
        
        const res2 = await userBL.deleteCollection()
        console.log(res2)
        const userDB  ={
            username:"renan",
            password:"123",
            created:"2022-02-07T00:09:08.744Z",
        }
      
        const premissionsArr=["View Subscriptions","Create Subscriptions","Delete Subscriptions","Update Subscriptions","View Movies","Create Movies","Delete Movies","Update Movies"];
        
        const dataReturnUserDB = await userBL.addUser(userDB) 
        console.log(dataReturnUserDB)
        console.log("Added to DB")
        console.log("New admin Id to the DB " + dataReturnUserDB._id)
        const newId = dataReturnUserDB._id;
        const userJSON = {
            id:newId,
            fName: "renan",
            lName: "bazinin",
            created:"2022-02-07T00:09:08.744Z"
        }
        const userJSONPerm = {
            id:newId,
            premissions:premissionsArr
            
        }      
        urlfile = "./JSON/Users.json"
        
        const dataReturnJson = await userBL.userJSONAdd(userJSON,urlfile)
        
        console.log("Json1 try " +dataReturnJson)
        console.log("Added to JS Users")
        urlfile = "./JSON/permissions.json"
        const dataReturnJsonPerm = await userBL.userJSONAdd(userJSONPerm,urlfile)
        console.log("Added to JS Perm")

        return res.json([dataReturnUserDB,dataReturnJson,dataReturnJsonPerm])
    }
    catch(err){
    return res.json(err)
    }
 })
/////Abobe just the restart server USERDB

 router.route("/permissionsfile/:id").delete(async (req,res)=>{
     try{
         console.log("try to delete perm")
    const urlfile = "./JSON/permissions.json"
    const id = req.params.id//the param catch in url
    const res2 = await userBL.deleteUserJson(id,urlfile)
    return res.json(res2)
     }
     catch(err){
        return res.json(err)
     }
 })

 router.route("/userfile/:id").delete(async (req,res)=>{
    try{
    const urlfile = "./JSON/Users.json"
    const id = req.params.id//the param catch in url
    const res2 = await userBL.deleteUserJson(id,urlfile)
    return res.json(res2)
    }
    catch(err){
    return res.json(err)
    }
 })


module.exports = router;