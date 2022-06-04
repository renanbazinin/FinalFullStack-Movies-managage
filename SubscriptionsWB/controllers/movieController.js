const express = require("express");
const router = express.Router()
const movieBL = require("../services/movieService")
router.route("/").get( async (req,res) =>{


    const data = await movieBL.getAllMovies()
    return res.json(data)
})

router.route("/:id").get( async (req,res)=>{

    const id = req.params.id
    const obj = await movieBL.getMoviesById(id)
    return res.json(obj)
})

router.route("/").post(async (req,res)=>{
  
    try{
        const movie = req.body;
   
        await movieBL.addMovie(movie) 
        return res.json("ok")
    }

   catch(err){
       return res.json(err)
   }

  
})

router.route("/:id").put(async (req,res)=>{
    console.log("put");
    const id = req.params.id;
    const movie = req.body;
    const obj = await movieBL.updateMovies(id,movie);
 
    return res.json(obj)
 })

 router.route("/:id").delete(async (req,res)=>{
   
    const id = req.params.id
    await movieBL.deleteMovies(id)
    return res.json()
 })



module.exports = router;