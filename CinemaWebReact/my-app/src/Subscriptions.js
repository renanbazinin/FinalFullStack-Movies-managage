import React, { useState, useEffect } from 'react';
import { Routes, Route, Link ,useNavigate, Outlet} from "react-router-dom"

export default function Subscriptions() {
  const navigate = useNavigate()
  useEffect(() => {
    
    // some 
    if(!sessionStorage.getItem("loged"))
      navigate("/login")
    navigate("allmembers")


}, [])

const naviHandle = (e)=>{
  console.log("try path")
  const path = e.target.name
  navigate(path)
}

  return <div>
    
  <h2>Subscriptions</h2>
  <button onClick={naviHandle} name="allmembers">All members</button>
    <button onClick={naviHandle} name="addmember">Add member</button>
  <Outlet />
  </div>;
}
