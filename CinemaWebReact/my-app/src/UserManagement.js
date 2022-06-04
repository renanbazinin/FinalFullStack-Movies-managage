import React, { useState, useEffect } from 'react';
import { Routes, Route, Link ,useNavigate, Outlet } from "react-router-dom"
import Users from './adminPages/Users';
import AddUser from './adminPages/AddUser';
export default function UserManagement() {
    const navigate = useNavigate()


    useEffect(() => {
        console.log("nav suc")
        
        navigate("users")
        
    }, [])
    
    const naviHandle = (e)=>{
        console.log("try path")
        const path = e.target.name
        navigate(path)
      }

      
  return <div>
      <h2>
          Manage Users
      </h2>
      <button onClick={naviHandle} name="users">All Users</button>
      <button onClick={naviHandle} name="adduser">Add User</button>
      <Outlet />

  </div>;
}
