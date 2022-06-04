import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link ,useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({ username: "" , password:""})
    const [activeUser, setActiveUser] = useState({ username: "",isExsit:false})
    const handleValue = (e)=>{
        const name = e.target.name;
        const val = e.target.value;
        setUser({...user,[name]:val})
    }  

    const logInCheck = async(e)=>{
        const port = "8001"
        if(user.password==="" && user.password==="NEW")
            {
                alert("bruh, put some password first or can't be a simple word like NEW")
                return
            }

        try{
          
          const dataDB = await axios.get(`http://localhost:${port}/users`)
          console.log(dataDB)
          const users = dataDB.data
          console.table(users)
          let id=-1;
          let usernameFound;
          const found = users.map((userDB,index)=>{
            if(userDB.username===user.username && userDB.password==="NEW"){
                id = userDB._id;
                usernameFound = user.username 
                return userDB
            }
          })
          if(id===-1){
            setActiveUser({username:"Wrong username or user alreay created"})  
            return
        }
          const res = await axios.put(`http://localhost:${port}/users/${id}`,
          {
              username:usernameFound,
              password:user.password
          })
          setActiveUser({username:"hello"+usernameFound})
          dispatch({ type: "USERIN", payload: usernameFound })

          console.log(found)
          const rawDataPerm = await axios.get(`http://localhost:${port}/users/permissionsfile/${id}`)
   
          sessionStorage.setItem("perm",rawDataPerm.data[0].premissions)
          sessionStorage.setItem("userName",usernameFound)
          sessionStorage.setItem("loged",true)
          
          }
          catch(err){
            alert("Can't connect with web server CinmeaWS")
          }
          navigate("movies/allmovies")

    }
  return <div>
      <h2>
          Creat Account 
     </h2>
     <h3>{activeUser.username}</h3>
     <Link to="/login">Alreay created ? Log in</Link> 
     <br/>
          <label>username</label>
        <input type={"text"} onChange={handleValue} name="username"></input><br/>
        <label>Password</label>
        <input type={"text"} onChange={handleValue} name="password"></input><br/>
        <button onClick={logInCheck}>Creat</button><br />
    

  </div>;
}
