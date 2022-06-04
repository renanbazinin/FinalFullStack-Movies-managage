import React, { useState, useEffect } from 'react';
import { Routes, Route, Link ,useNavigate} from "react-router-dom"
import { useDispatch ,useSelector} from "react-redux";
import axios from 'axios';

export default function AllMovies() {
  const port = 8000
  const portUsers = 8001
  const [moviesList, serMoviseList] = useState({moviesList:[]}) 
  const dispatch = useDispatch(); // dispatch = action
  const storeData = useSelector(store => { return store })
  const navigate = useNavigate()

  useEffect(async() => {

  },)

  useEffect(async () => {
    if(!sessionStorage.getItem("loged")){
      navigate("/login")
      alert("log in first please")
      return

      }
      const allMoviesWath = "View Movies"
      let flagView=false;
      sessionStorage.getItem("perm").split(",").map((perm,i)=>{
        if(allMoviesWath===perm)
          flagView=true 
    })

    if(!flagView)
    {
      alert("don't have permissions for view movies\nYou have only for \n" +sessionStorage.getItem("perm"))
      return
    }
    const dataSubMoiveRaw = await axios.get(`http://localhost:${port}/subs`)
    const dataMoviesRaw = await axios.get(`http://localhost:${port}/movies`)
    console.log("movies: ")
    console.log(dataMoviesRaw.data)
    const newMovies = dataMoviesRaw.data
    let nameTemp;
    const subData = await Promise.all(dataSubMoiveRaw.data.map( async(sub,i)=>{
      console.log(sub)
        nameTemp = await axios.get(`http://localhost:${port}/members/${sub.memberId}`)
        console.log(nameTemp.data)
        sub.nameWatched = nameTemp.data.name
    }))

    dataMoviesRaw.data.forEach((movie,i)=>{
      dataSubMoiveRaw.data.forEach((sub,i)=>{
         sub.movies.forEach(movieSub=>{
          if(movieSub.movieId===movie._id){
            //nameTemp = await axios.get(`http://localhost:${portUsers}/subs`)
            if(movie.subs!==undefined)
             movie.subs.push({usetWatchedName:sub.nameWatched,usetWatchedId:sub.memberId,movie:movie._id,movieDate:movieSub.date})            
             else
              movie.subs=[{usetWatchedName:sub.nameWatched,usetWatchedId:sub.memberId,movie:movie._id,movieDate:movieSub.date}]
            
          }
        })
      })
    })
    console.log(dataMoviesRaw.data)
    serMoviseList({moviesList:dataMoviesRaw.data})
  }, [])

  const handleEdit= async(e)=>{
    const allMoviesWath = "Update Movies"
    let flagView=false;
    sessionStorage.getItem("perm").split(",").map((perm,i)=>{
      if(allMoviesWath===perm)
        flagView=true 
  })

  if(!flagView)
  {
    alert("don't have permissions for update movies\nYou have only for \n" +sessionStorage.getItem("perm"))
    return
  }

    const id = e.target.value;
  
    sessionStorage.setItem("idEditMovie",id)
    await navigate("/editmovie")
    
  }
  const handleDelete =async (e)=>{
    if(!sessionStorage.getItem("loged")){
      navigate("/login")
      alert("log in first please")
      return

      }
      const allMoviesWath = "Delete Movies"
      let flagView=false;
      sessionStorage.getItem("perm").split(",").map((perm,i)=>{
        if(allMoviesWath===perm)
          flagView=true 
    })

    if(!flagView)
    {
      alert("don't have permissions for Delete movies\nYou have only for \n" +sessionStorage.getItem("perm"))
      return
    }
    const dataMoviesAfterDelete = await axios.delete(`http://localhost:${port}/movies/${e.target.value}`)
    const dataMoviesRaw = await axios.get(`http://localhost:${port}/movies`)
    console.log("moviesAftet delete: ")
    console.log(dataMoviesRaw.data)
    serMoviseList({moviesList:dataMoviesRaw.data})
    ////now need to handle the subs that see the movie.
    const subsDataRaw = await axios.get(`http://localhost:${port}/subs`)
    const newSubs = Promise.all(subsDataRaw.map(async(memberSub,i)=>{
        if(memberSub.memberId===e.target.value)
        {
          const subResDelete = await axios.get(`http://localhost:${port}/subs/${memberSub._id}`)
        }
        else
          return memberSub
    }))

  }
  const handlMember=(e)=>{
    sessionStorage.setItem("idEditMember",e.target.value)
 
    navigate("/editmember")
  }
  const movieDivs = moviesList.moviesList.map((movie,i)=>{
    return <div key={movie._id} style={{border:"1px solid black"}}><br/>{movie.name}, {movie.premiered.substring(0, 4)}<br/>
    genres:{movie.genres.map((gan)=>{
      return '"'+gan+'", '
    })}
    <br/>
    {console.log(movie.subs)}
    <img src={movie.image} style={{width:"10%"}} /> <br/>
    
    {movie.subs!==undefined?"Subscriptions watched" :""} 
    {movie.subs!==undefined? movie.subs.map(sub=>{return <li> <button  onClick={handlMember} value={sub.usetWatchedId}>{sub.usetWatchedName}</button> , {sub.movieDate}</li>}) :""} 
    <br/>
    <button onClick={handleEdit} value={movie._id}>Edit</button> <button value={movie._id} onClick={handleDelete}>Delete</button>
    </div>
  })
  return <div>
      <h2>Movies</h2>
       {movieDivs}
  </div>;
}
