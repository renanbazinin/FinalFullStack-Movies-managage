import React, { useState, useEffect } from 'react';
import { Routes, Route, Link ,useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import axios from "axios"

import "./App.css"


import LogIn from './LogIn';
import Movies from './Movies';
import SignIn from './SignIn';
import UserManagement from './UserManagement';
import Subscriptions from './Subscriptions';
import Users from './adminPages/Users';
import AddUser from './adminPages/AddUser';
import Edit from './adminPages/Edit';
import AllMovies from './moviesSec/AllMovies';
import AddMovie from './moviesSec/AddMovie';
import EditMovie from './moviesSec/EditMovie';
import AddMember from './subscriptionsSec/AddMember';
import AllMembers from './subscriptionsSec/AllMembers';

import { useSelector } from "react-redux"
import EditMember from './subscriptionsSec/EditMember';


export default function App() {
  
  const dispatch = useDispatch(); // dispatch = action

  const storeData = useSelector(store => { return store })
  const navigate = useNavigate()

  useEffect(() => {
    
      

        // some logics
        if(!sessionStorage.getItem("loged")){
          
          navigate("/login")
        }
        else{
          dispatch({ type: "USERIN", payload: sessionStorage.getItem("username") }) 
          navigate("/movies")
        }
  }, [])

  const naviHandle = (e)=>{
    const path = e.target.name
    navigate(path)
  }

  const logOut = ()=>{
    dispatch({ type: "USEROUT"}) 
    sessionStorage.clear();
    navigate("/login")
  }
  const restartAndAdd = async()=>{
    const deRes = axios.delete("http://localhost:8001/users/deleteAll");
    console.log(deRes)

  }
  return <div className='App'>
      {!storeData.active?<button style={{alignContent:"flex-end"}} onClick={restartAndAdd}>Restart userDB (and add renan Admin)</button>:""}
      {!storeData.active?<div><br/><br/></div>:""}
      <div className='App'>
      {storeData.active?<h3>hello {sessionStorage.getItem("userName")}</h3>:""}
      <button onClick={naviHandle} name="/movies/allmovies">Movies</button>
      <button onClick={naviHandle} name="/subscriptions/allmembers">Subscriptions</button>
      {sessionStorage.getItem("userName")==="renan"? <button onClick={naviHandle} name="/usernanagement/users">Users Managment</button>:""}
      {storeData.active? <button onClick={logOut} >Log Out</button>:""}
    </div>
  <Routes>
    <Route path='editmember' element={<EditMember/>} />
    <Route path='/edit' element={<Edit/>} />
    <Route path='/login' element={<LogIn/>} />
    <Route path='/editmovie' element={<EditMovie/>} />
    <Route path='/movies' element={<Movies/>} > 
        <Route path="allmovies" element={<AllMovies />} />
        <Route path="addmovie" element={<AddMovie />} />
    </Route>

    <Route path="/usernanagement" element={<UserManagement />} >
        <Route path="users" element={<Users />} />
        <Route path="adduser" element={<AddUser />} />
    </Route>

    <Route path='/subscriptions' element={<Subscriptions/>} > 
        <Route path="allmembers" element={<AllMembers />} />
        <Route path="addmember" element={<AddMember />} />

    </Route>
    <Route path='/signin' element={<SignIn/>} />
  </Routes>
  
    </div>;
}
