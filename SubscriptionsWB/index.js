const express = require("express");
const cors = require("cors");

const connectDB = require("./configs/db");
const movieController = require("./controllers/movieController")
const memberController = require("./controllers/memberController")
const subController = require("./controllers/subController")
const axios = require("axios")

const movieBL = require("./services/movieService")


const app = express();
const port = 8000;

app.use(cors());
connectDB()
//They converted  what
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/movies",movieController)
app.use("/members",memberController)
app.use("/subs",subController)


const makePostMovies = async()=>{
    let respondDB
    const response = await axios.get("https://api.tvmaze.com/shows"); // mid data
    console.log(typeof response)
    const data = (response.data)
    
    let newMovie;
    await Promise.all(data.map(async (movie,i) => {

        
        newMovie = {
            name:movie.name,
            genres:movie.genres,
            image:movie.image.medium,
            premiered:movie.premiered,

        }

        try{
        respondDB = await axios.post(`http://localhost:${port}/movies`,newMovie)
        }
        catch(err){
            console.log("error on " +i)
        }
   
    })); 
}
const makeMembersPost = async()=>{
    let respondDB
    const response = await axios.get("https://jsonplaceholder.typicode.com/users"); // mid data
    console.log(typeof response)
    const data = (response.data)
    
    let newUser;
    await Promise.all(data.map(async (user,i) => {

        
        newUser = {
            name:user.name,
            email:user.email,
            city:user.address.city,
          

        }

        try{
        respondDB = await axios.post(`http://localhost:${port}/members`,newUser)
        }
        catch(err){
            console.log("error on " +i)
        }
   
    })); 
}

const makeVaildDB = async()=>{
   
    let res = await axios.get(`http://localhost:${port}/movies`)
    let data = res.data
    console.log(data)
    console.log(data.length)
    if(data.length > 0 && data != undefined)
        console.log("good movies")
    else{
        console.log("now movies will fetch")
        makePostMovies()
    
    }
    ////now members
    res = await axios.get(`http://localhost:${port}/members`)
    data = res.data
    console.log(data)
    console.log(data.length)
    if(data.length > 0 && data != undefined)
        console.log("good members")
    else{
        console.log("now members will fetch")
        makeMembersPost()
        
    
    }
}

makeVaildDB()


app.listen(port,()=>{

    console.log("App is listening")
    console.log("http://localhost:"+port)
}

)
