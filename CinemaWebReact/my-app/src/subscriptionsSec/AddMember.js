import React, {  useEffect,useState } from 'react';
import axios from 'axios';


import { Routes, Route, Link ,useNavigate} from "react-router-dom"

export default function AddMember() {

  useEffect(async () => {
    const allSubWaych = "Create Subscriptions"
    let flagView =false
    sessionStorage.getItem("perm").split(",").map((perm,i)=>{
        if(allSubWaych===perm)
          flagView=true 
    })

    if(!flagView)
    {
      alert("don't have permissions for Create members\nYou have only for \n" +sessionStorage.getItem("perm"))
      navigate("/movies/allmovies")
      return
    }

  }, [])

  const port = 8000
  const [member, setMember] = useState({name:"",email:"",city:""}) 
  const navigate = useNavigate()


  const handlValues =(e)=>{
    setMember(member=>({...member,[e.target.name]:e.target.value}))
  }

  const addUser = async(e)=>{
    const newMember = {
      name:member.name,
      email:member.email,
      city:member.city,
    }

    const res = await axios.post(`http://localhost:${port}/members`,newMember)
    navigate("/subscriptions/allmembers")
  }
  return <div>

    <h2>Add members</h2>
    Adding -
      <br/>
      <label>Name </label>
      <input type={"text"} onChange={handlValues} name="name" value={member.name} /><br/>
      <label>Email</label>
      <input type={"text"} onChange={handlValues} name="email" value={member.email} /><br/>
      <label>City </label>
      <input type={"text"} onChange={handlValues} name="city" value={member.city} /><br/>
    
    <button onClick={addUser}>Add </button> 
    <button onClick={()=>{navigate("/subscriptions/allmembers")}}>Cancel</button>
  </div>;
}
