import React, {  useEffect,useState } from 'react';
import axios from 'axios';


import { Routes, Route, Link ,useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";



export default function AddMovie() {
  const port = 8000
  const [movie, setMovise] = useState({name:"",genres:[],image:"",premiered:""}) 
  const navigate = useNavigate()


  const handlEditing = (e)=>{
    setMovise(movie=>({...movie,[e.target.name]:e.target.value}))
  }

  const addMovie = async(e)=>{
   
    const newMovie = {
      name:movie.name,
      genres:movie.genres.split(','),
      image:movie.image,
      premiered:movie.premiered
    }
    
    const respondDB = await axios.post(`http://localhost:${port}/movies`,newMovie)

    navigate("/movies/allmovies")
  }


  return <div>
      <h2>Add Movie</h2>
      
      <label>Name:</label>
      <input type={"text"} name="name" onChange={handlEditing} /><br/>
      <label>Genres:</label>
      <input type={"text"} name="genres"  onChange={handlEditing} /><br/>
      <label>Image Url:</label>
      <input type={"text"} name="image"  onChange={handlEditing} /><br/>
      <label>Premired:</label>
      <input type={"date"} name="premiered"  onChange={handlEditing} /><br/>
    <button onClick={addMovie}>Add</button> <button onClick={()=>{navigate("/movies/allmovies")}}>Cancel</button>


  </div>;
}
