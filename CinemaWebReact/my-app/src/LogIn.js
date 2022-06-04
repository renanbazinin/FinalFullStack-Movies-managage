import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Routes, Route, Link ,useNavigate} from "react-router-dom"
import "./App.css"

import { useDispatch } from "react-redux";


export default function LogIn() {
    const navigate = useNavigate()

    const [user, setUser] = useState({ username: "" , password:""})
    const [activeUser, setActiveUser] = useState({ username: "",isExsit:false})
    const dispatch = useDispatch(); // dispatch = action

  
    useEffect(() => {
      
  }, [])
  
  
    const handleValue = (e)=>{
      const name = e.target.name;
      const val = e.target.value;
      setUser({...user,[name]:val})
  
    }
  
    const logInCheck = async()=>{
      const port = "8001"

    try{
      const dataDB = await axios.get(`http://localhost:${port}/users`)
      const rawDataPerm = await axios.get(`http://localhost:${port}/users/permissionsfile/`)
   


      const users = dataDB.data
      console.table(users)
      const found = users.map((userDB,index)=>{
        if(userDB.username===user.username && userDB.password===user.password && userDB.password !=="NEW"){
          setActiveUser({username:userDB.username,isExsit:true})
          dispatch({ type: "USERIN", payload: userDB.username })
          const userPerm = rawDataPerm.data.filter((perUser,i)=>{
            return(perUser.id===userDB._id)

          })
          console.warn(userPerm[0].premissions)
          dispatch({ type: "PERM", payload: userPerm[0].premissions })
          sessionStorage.setItem("perm", userPerm[0].premissions)
          sessionStorage.setItem("userName", userDB.username)
          sessionStorage.setItem("loged",true)
          navigate("/movies")
          return userDB
        }
      })
      console.log(found)
      if(found[0] === undefined)
      {
        
        setActiveUser({username:"Wrong username or password"})
      }    
    
    }
    

      catch(err){
        alert("Can't connect with web server CinmeaWS")
      }
    }
  
    return <div className='App'>
      <h1>Movies - Subscriptions web site</h1>
      <h3>Dear worker, if this is the first time . Please press Sign In link</h3>
      <span style={{color:"red"}}>{ activeUser.isExsit? "":activeUser.username} </span><br/>
      <label>User name</label>
      <input type={"text"} onChange={handleValue} name="username"></input><br/>
      <label>Password</label>
      <input type={"text"} onChange={handleValue} name="password"></input><br/>
      <button onClick={logInCheck}>Log in</button><br />
      <Link to="/signin">Sign in</Link> 
      </div>;
  }
  