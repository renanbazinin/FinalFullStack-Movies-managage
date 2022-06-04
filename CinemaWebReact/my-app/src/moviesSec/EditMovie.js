import React, { useState, useEffect } from 'react';
import { Routes, Route, Link ,useNavigate} from "react-router-dom"
import { useDispatch ,useSelector} from "react-redux";
import axios from 'axios';


export default function EditMovie() {
    const port = 8000
    const [movie, serMovise] = useState({name:"",genres:[],image:"",premiered:""}) 
    const navigate = useNavigate()
        
    useEffect(async () => {
        const dataMoviesRaw = await axios.get(`http://localhost:${port}/movies/${sessionStorage.getItem("idEditMovie")}`)
        console.log("movies: ")
        console.log(dataMoviesRaw.data)
        serMovise( {name:dataMoviesRaw.data.name,genres:dataMoviesRaw.data.genres,image:dataMoviesRaw.data.image,premiered:dataMoviesRaw.data.premiered})

      }, [])

    const handlEditing = (e)=>{
        serMovise(movie=>({...movie,[e.target.name]:e.target.value}))
    }
    

    const updateMovie = async(e)=>{
      const newMovie = {
        name:movie.name,
        genres:movie.genres,
        image:movie.image,
        premiered:movie.premiered
      }

      const respondDB = await axios.put(`http://localhost:${port}/movies/${sessionStorage.getItem("idEditMovie")}`,newMovie)
      navigate("/movies")
    }

  return <div>
      
      <label>Name:</label>
      <input type={"text"} name="name" value={movie.name} onChange={handlEditing} /><br/>
      <label>Genres:</label>
      <input type={"text"} name="genres" value={movie.genres} onChange={handlEditing} /><br/>
      <label>Image Url:</label>
      <input type={"text"} name="image" value={movie.image} onChange={handlEditing} /><br/>
      <label>Premired:</label>
      <input type={"date"} name="premired" value={movie.premiered.substring(0,10)} onChange={handlEditing} /><br/>
    <button onClick={updateMovie}>Save</button> <button onClick={()=>{navigate("/movies")}}>Cancel</button>
  </div>;
}
