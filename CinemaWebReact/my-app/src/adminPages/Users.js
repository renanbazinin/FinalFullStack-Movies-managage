import React, {  useEffect,useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { Routes, Route, Link ,useNavigate} from "react-router-dom"


export default function Users() {
    const dispatch = useDispatch();
    const port = 8001;
    const storeData = useSelector(store => { return store })
    const [users, setUsers] = useState({ userList:[]})
    const navigate = useNavigate()

        useEffect(async() => {

            if(sessionStorage.getItem("userName")!=="renan")
                navigate("/movies")
        },)
        useEffect(async() => {


            console.log("Users Page")
            console.log("effecUser")
            const newARR=[]
            
            
            const userDataRaw = await axios.get(`http://localhost:${port}/users/userfile`)
            const userData = userDataRaw.data.sort()
        
            await Promise.all(userData.map(async (user,i)=>{
                const dataraw = await axios.get(`http://localhost:${port}/users/${user.id}`)
                const userDataPermRaw = await axios.get(`http://localhost:${port}/users/permissionsfile/${user.id}`)
                let userPer;
                if(userDataPermRaw.data === undefined)
                    userPer=""
                else if(userDataPermRaw.data[0].premissions.length===8)
                    userPer=["ALL, he is the master"]
                else
                    userPer=userDataPermRaw.data[0].premissions
                const dateString = new Date(user.created)
                dateString.toISOString();
                const fName = user.fName;
                const lName = user.lName;
                let newUser;
                if(dataraw.data!==null)
                newUser={
                    id:user.id,
                    name:fName+" "+lName,
                    username:dataraw.data.username,
                    permissionArr:userPer,
                    created:dateString.toISOString().substring(0,10)
                }
                else
                newUser={
                    name:fName+" "+lName,
                    username:"Problem to find",
                    created:user.created
                }
                newARR.push(newUser)
            }))
            console.log(newARR)
            setUsers({userList:newARR})

        
            
        }, [])
            const handleEdit= async(e)=>{
                const id = e.target.value;
            
                sessionStorage.setItem("idEdit",id)
                await navigate("/edit")
                
            }
            const deleteHandl = async(e)=>{
            ///first I will put in db server then in 
            const id = e.target.value
            const userDBresDelete = await axios.delete(`http://localhost:${port}/users/${id}`)
            console.warn(userDBresDelete)
            const userJSONresDelete = await axios.delete(`http://localhost:${port}/users/userfile/${id}`)
            console.warn(userJSONresDelete)
            const userJSON2resDelete = await axios.delete(`http://localhost:${port}/users/permissionsfile/${id}`)
      
            const newUserList = users.userList.filter((user,i)=>{
                if(user.id!==id)
                    return user
            })
            console.warn(newUserList)
            await setUsers({userList:newUserList})
            
            //console.warn("newUserList")
            //navigate("/movies/allmovies")
            }   

            const compare = ( a, b ) =>{
                if ( a._id < b._id ){
                  return 1;
                }
                return 0;
              }
              
            const userList = users.userList.sort(compare).map((user,i)=>{
        return <div style={{border:"1px solid black"}} key={user.id}>
            Name:{user.name} <br/>
            Username :{user.username}<br/>
            Created: {user.created}<br/>
            permissions: <br/> {user.permissionArr!==undefined?user.permissionArr.map(per=>{
                return <span key={`per${user.id}${per}`}>{per},</span>
            }):""}
            <br/>
            <button onClick={handleEdit} value={user.id}>Edit</button>
            {user.username==="renan"?<button disabled tite="renan is the admin">Delete</button>:<button onClick={deleteHandl} value={user.id} >Delete</button>}
        </div>
})
  return <div>

      <h2>All users</h2>
    {userList}
    
  </div>;
}
