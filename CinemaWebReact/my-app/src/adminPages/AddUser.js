import React,{useState} from 'react';
import { Routes, Route, Link ,useNavigate} from "react-router-dom"
import axios from 'axios'; 

export default function AddUser() {
  const [user, setUser] = useState({fName:"",lName:"",created:"",username:""})
  const [userPre, setUserPre] = useState({viewS:false,createS:false,deleteS:false,updateS:false,viewM:false,createM:false,deleteM:false,updateM:false})
   

  const navigate = useNavigate()
  const handlvalue = async(e)=>{
      await setUser(user=>({...user,[e.target.name]:e.target.value}))
  }
  const handlCheckbox = (e)=>{
    if(e.target.name==="createS")
    setUserPre(userPre=>({...userPre,[e.target.name]:e.target.checked,"viewS":true,"deleteS":true,"updateS":true}))
    else if(e.target.name==="createM")
        setUserPre(userPre=>({...userPre,[e.target.name]:e.target.checked,"viewM":true,"deleteM":true,"updateM":true}))
    else
        setUserPre(userPre=>({...userPre,[e.target.name]:e.target.checked}))
  }

  const creatUser = async()=>{
    const port=8001

    const resCheckIfExsit = await axios.get(`http://localhost:${port}/users`)
    let flagExsit=false;
    resCheckIfExsit.data.forEach(userDB => {
        if(userDB.username === user.username)
            flagExsit=true;
    });
    if(flagExsit){
        alert("username taken")
        return
    }

    const res = await axios.post(`http://localhost:${port}/users`,
    {
        username:user.username,
        password:"NEW"
    })


    const newId = res.data._id
    
    //await sessionStorage.setItem("userName", user.username)
    //await sessionStorage.setItem("idEdit",newId)
    
    const resPutUser = await axios.post(`http://localhost:${port}/users/userfile`
    ,
    {
        id:newId,
        fName:user.fName,
        lName:user.lName,
        created:new Date()
    }
    )
    const perArr =[];
    userPre.viewS?perArr.push("View Subscriptions"):console.log("")
    userPre.createS?perArr.push("Create Subscriptions"):console.log("")
    userPre.createS?perArr.push("Delete Subscriptions"):console.log("")
    userPre.updateS?perArr.push("Update Subscriptions"):console.log("")
    userPre.viewM?perArr.push("View Movies"):console.log("")
    userPre.createM?perArr.push("Create Movies"):console.log("")
    userPre.deleteM?perArr.push("Delete Movies"):console.log("")
    userPre.updateM?perArr.push("Update Movies"):console.log("")

    const resPutPer = await axios.post(`http://localhost:${port}/users/permissionsfile`
    ,
    {
        id:newId,
        premissions:perArr
    }
    )

    navigate("/movies/allmovies")
    
  }
  return <div>
      <h2>AddUser</h2>
      <label>First Name </label>
      <input type={"text"} onChange={handlvalue} name="fName" /><br/>
      <label>Last Name </label>
      <input type={"text"} onChange={handlvalue} name="lName"  /><br/>
      <label>Username </label>
      <input type={"text"} onChange={handlvalue} name="username" /><br/>
      <label>Created </label>
      <input type={"text"} onChange={handlvalue} name="created" disabled /><br/>
      <label>Session </label>
      <input type={"text"} onChange={handlvalue} name="session" disabled /><br/>

      <label>Permissions:  </label><br/>
      <label>Views Subscriptions<input type={"checkbox"} name="viewS" checked={userPre.viewS} onChange={handlCheckbox}/></label><br/>
      <label>Create Subscriptions<input type={"checkbox"} name="createS"  checked={userPre.createS} onChange={handlCheckbox} /></label><br/>
      <label>Delete Subscriptions<input type={"checkbox"} name="deleteS" checked={userPre.deleteS} onChange={handlCheckbox} /></label><br/>
      <label>Update Subscriptions<input type={"checkbox"} name="updateS" checked={userPre.updateS} onChange={handlCheckbox} /></label><br/>

      <label>Views Movies<input type={"checkbox"} name="viewM"  checked={userPre.viewM} onChange={handlCheckbox} /></label><br/>
      <label>Create Movies<input type={"checkbox"} name="createM" checked={userPre.createM} onChange={handlCheckbox}/></label><br/>
      <label>Delete Movies<input type={"checkbox"} name="deleteM" checked={userPre.deleteM} onChange={handlCheckbox}/></label><br/>
      <label>Update Movies<input type={"checkbox"} name="updateM" checked={userPre.updateM} onChange={handlCheckbox} /></label><br/>
      <button onClick={creatUser} >Create</button> <button onClick={()=>{navigate("/usernanagement")}}>Cancel</button>
  </div>
}
