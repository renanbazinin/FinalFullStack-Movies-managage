import React, {  useEffect,useState } from 'react';
import axios from 'axios';


import { Routes, Route, Link ,useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";

export default function EditMember() {
    const port = 8000
    const [member, setMember] = useState({name:"",email:"",city:""}) 
    const navigate = useNavigate()

    useEffect(async () => {
        const dataMemberRaw = await axios.get(`http://localhost:${port}/members/${sessionStorage.getItem("idEditMember")}`)
        console.log("members: ")
        console.log(dataMemberRaw.data)
        setMember({name:dataMemberRaw.data.name,email:dataMemberRaw.data.email,city:dataMemberRaw.data.city})
      }, [])


    const handlEditing = (e)=>{
        setMember(member=>({...member,[e.target.name]:e.target.value}))
    }
    const updateUser =async (e)=>{
        const newUser = {
            name:member.name,
            email:member.email,
            city:member.city
        }
        const res = await axios.put(`http://localhost:${port}/members/${sessionStorage.getItem("idEditMember")}`,newUser)
        navigate("/subscriptions")
        console.log(res)
    }


  return <div>


<h2>Edit page</h2>
      editing - {sessionStorage.getItem("idEdit")}
      <br/>
      <label>Name </label>
      <input type={"text"} onChange={handlEditing} name="name" value={member.name} /><br/>
      <label>Email</label>
      <input type={"text"} onChange={handlEditing} name="email" value={member.email} /><br/>
      <label>City </label>
      <input type={"text"} onChange={handlEditing} name="city" value={member.city} /><br/>
    
    <button onClick={updateUser}>Update </button> 
    <button onClick={()=>{navigate("/subscriptions")}}>Cancel</button>

  </div>;
}
