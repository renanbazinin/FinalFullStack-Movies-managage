
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link ,useNavigate, Outlet} from "react-router-dom"

export default function Movies() {
    const navigate = useNavigate()

    useEffect(() => {
      if(!sessionStorage.getItem("loged")){
        navigate("/login")
        alert("log in first please")
        return

      }
      console.log(sessionStorage.getItem("perm"))
      
      const allMoviesWath = "View Movies"
      let flagView =false
      sessionStorage.getItem("perm").split(",").map((perm,i)=>{
      //sessionStorage.getItem("perm").map((perm,i)=>{
          if(allMoviesWath===perm)
            flagView=true 
      })

      if(!flagView)
      {
        alert("don't have permissions for view movies\nYou have only for \n" +sessionStorage.getItem("perm"))
        return
      }

        navigate("allmovies")

    
  }, [])

  const handleNavToall = ()=>{
    const allMoviesWath = "View Movies"
    let flagView =false
    sessionStorage.getItem("perm").split(",").map((perm,i)=>{
        if(allMoviesWath===perm)
          flagView=true 
    })

    if(!flagView)
    {
      alert("don't have permissions for view movies\nYou have only for \n" +sessionStorage.getItem("perm"))
      return
    }

      navigate("allmovies")

  }

  const handleNavToAdd = ()=>{
    const allMoviesWath = "Create Movies"
    let flagView =false
    sessionStorage.getItem("perm").split(",").map((perm,i)=>{
        if(allMoviesWath===perm)
          flagView=true 
    })

    if(!flagView)
    {
      alert("don't have permissions for create movies\nYou have only for \n" +sessionStorage.getItem("perm"))
      return
    }

      navigate("addmovie")

  }
  return <div>

        <h1>Movies</h1>
        <button onClick={handleNavToall}>All movies</button> <button onClick={handleNavToAdd}>Add movies</button>
        <Outlet />
  </div>;
}
