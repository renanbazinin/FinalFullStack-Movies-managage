import React, { useState, useEffect } from 'react';
import { Routes, Route, Link ,useNavigate} from "react-router-dom"
import { useDispatch ,useSelector} from "react-redux";
import axios from 'axios';

export default function AllMembers() {
    const port = 8000
    const [movieList, setMovieList] = useState({movieList:[]}) 
    const [membersList, setmembersList] = useState({membersList:[]}) 
    const [addClicked, setAddClicked] = useState({clicked:false}) 
    //const [subSMoviesArray, setSubSMoviesArray] = useState({}) 
    const [justChosenMovie,setjustChosenMovie] = useState({chosen:"",chosenDate:((new Date).toISOString().substring(0,10))})
    const dispatch = useDispatch(); // dispatch = action
    const storeData = useSelector(store => { return store })
    const navigate = useNavigate()



    useEffect(async () => {
        if(!sessionStorage.getItem("loged")){
            navigate("/login")
            alert("log in first please")
            return
    
          }
          const allSubWaych = "View Subscriptions"
          let flagView =false
          sessionStorage.getItem("perm").split(",").map((perm,i)=>{
              if(allSubWaych===perm)
                flagView=true 
          })
    
          if(!flagView)
          {
            alert("don't have permissions for view members\nYou have only for \n" +sessionStorage.getItem("perm"))
            navigate("/login")
            return
          }
        const dataMoviesRaw = await axios.get(`http://localhost:${port}/movies`)
        const dataMemberRaw = await axios.get(`http://localhost:${port}/members`)
        const moviesSub = await axios.get(`http://localhost:${port}/subs/`)
        console.log("members: ")
        console.log(dataMemberRaw.data)
        const newArrMem = await Promise.all(dataMemberRaw.data.map(async(member,i)=>{
        console.log(i)
        const theSub = moviesSub.data.find((sub)=>
                sub.memberId===member._id
                    
        )
        
        member.subs=null;
        member.movies=null;
        if(theSub!==undefined){
        member.subs = theSub._id
        const moviesArray = await axios.get(`http://localhost:${port}/subs/${theSub._id}`) 
        member.movies=moviesArray.data.movies;
        }
        return member
      }))

      
      
      await setmembersList({membersList:newArrMem})
      await setMovieList({movieList:dataMoviesRaw.data})

    }, [addClicked])

    const addMovie = async(e)=>{

        if(justChosenMovie.chosen==="")
            alert("Choose a Movie isn't realy a movie")
        
        //const MemberId = e.target.value
        const theMovieToSub = justChosenMovie.chosen
        const theMovieDate = justChosenMovie.chosenDate
        const newSubs = {
            memberId:addClicked.clicked,
            movies:[{movieId:theMovieToSub,date:theMovieDate}]
        }
   
        //first I checked if user sub exist (have some movei)
   
        const moviesSub = await axios.get(`http://localhost:${port}/subs/`)
        let flagExsit = false;
        const subDB = moviesSub.data.filter((sub,i)=>{
            if(sub.memberId === addClicked.clicked){
                
                flagExsit=true;
                return sub
            }
        })
        
        if(!flagExsit) //need post
        {
            const moviesSub = await axios.post(`http://localhost:${port}/subs/`,
                newSubs
            )
        }
        else //need put
        {
            console.log(subDB)
            subDB[0].movies.push({movieId:theMovieToSub,date:theMovieDate})
            const moviesSub = await axios.put(`http://localhost:${port}/subs/${subDB[0]._id}`,
                subDB[0]
            )
        }
        
        await setAddClicked({clicked:false})
        
        //await axios.put()
    }
    const handleSelect = (e)=>{
        setjustChosenMovie(justChosenMovie=>({...justChosenMovie,chosen:e.target.value}))
    }
    const handleDate = (e)=>{
        setjustChosenMovie(justChosenMovie=>({...justChosenMovie,chosenDate:e.target.value}))
    }
    const handleEdit = (e)=>{

        const allSubWaych = "Update Subscriptions"
        let flagView =false
        sessionStorage.getItem("perm").split(",").map((perm,i)=>{
            if(allSubWaych===perm)
              flagView=true 
        })
  
        if(!flagView)
        {
          alert("don't have permissions for Update members\nYou have only for \n" +sessionStorage.getItem("perm"))
        
          return
        }


        sessionStorage.setItem("idEditMember",e.target.value)
        navigate("/editmember")
    }
    const goToMovie=(e)=>{
  
     
        sessionStorage.setItem("idEditMovie",e.target.value)
 
        navigate("/editmovie")
    }

    const handlDelete = async(e)=>{
        const allSubWaych = "Delete Subscriptions"
        let flagView =false
        sessionStorage.getItem("perm").split(",").map((perm,i)=>{
            if(allSubWaych===perm)
              flagView=true 
        })
  
        if(!flagView)
        {
          alert("don't have permissions for Delete members\nYou have only for \n" +sessionStorage.getItem("perm"))
        
          return
        }
        const id = e.target.value;
        const rawDataMovies = await axios.get(`http://localhost:${port}/subs`)
        ///I will search the member
        console.log(rawDataMovies.data)
        const theOneSub = rawDataMovies.data.filter((sub,i)=>{
            return (sub.memberId===id)
        })
        if(theOneSub.length<1)
        {
            console.log("I delete "+ id +" he didn't watch nothing")
        }
        else{
            ///the sub I need to delte
            
            const rawResDelete = await axios.delete(`http://localhost:${port}/subs/${theOneSub[0]._id}`)
        }
        const rawResMemberDel = await axios.delete(`http://localhost:${port}/members/${id}`)
        ////now render again

        navigate("movies/allmovies")
        
        

    }

    const membersDiv = membersList.membersList.map((member,i)=>{
        return <div key={member._id} style={{border:"1px solid black"}}><br/><h2>{member.name}</h2> <br/>
        Email:{member.email}<br/>
        City:{member.city}<br/>
        Movies:<div style={{border:"1px solid grey"} }>
        {member.subs===null?" didn't sub to nothing":member.movies.map((movie,i)=>{
            return movieList.movieList.map((movieAll,j)=>{
                if(movie.movieId===movieAll._id)
                    return <div key={`${member._id}btc`} ><button onClick={goToMovie} value={movieAll._id}>{movieAll.name}</button>, {movie.date}</div>
            })
        })}</div>
        <br/>
        <button onClick={()=>{setAddClicked({clicked:(addClicked.clicked===member._id)?false:member._id})}}>Subscripe to new</button>
        <br/>
        {addClicked.clicked===member._id?<div>
        <select onChange={handleSelect} defaultValue={"none"} >
            <option disabled value={"none"}>Choose A movie</option>
            {movieList.movieList.map((movieAll,i)=>{
                let flag = false;
                if(member.movies!==null){
                member.movies.forEach(movie => {
                    if(movie.movieId===movieAll._id)
                        flag=true;
                });
            }
                if(!flag)
                    return <option key={`option${member._id}i${i}`} value={movieAll._id} >{movieAll.name}</option>

        })}
        </select><input type={"Date"} onChange={handleDate} value={justChosenMovie.chosenDate}/><button onClick={addMovie} value={[member._id]}>Add movie (subscribe)</button></div>:""
        
        }

        <br/>
        <img src={member.image} style={{width:"10%"}} />
        <br/>
        <button onClick={handleEdit} value={member._id}>Edit</button> <button onClick={handlDelete} value={member._id} >Delete</button>
        </div>
      })

  return <div>
      
      <h2>All members</h2>
      {membersDiv}
  </div>;
}
