const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");

const userController = require("./controllers/userController")


const app = express();
const port = 8001;

app.use(cors());
connectDB()
//They converted  what
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/users",userController)


app.listen(port,()=>{
    console.log("App is listening")
    console.log("http://localhost:"+port)
}

)
