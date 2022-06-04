import React, {  useEffect,useState } from 'react';
import axios from 'axios';


import { Routes, Route, Link ,useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";






export default function Edit() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const port = 8001
    const [user, setUser] = useState({id:sessionStorage.getItem("idEdit"),fName:"",lName:"",created:"",username:""})
    const [userPre, setUserPre] = useState({id:sessionStorage.getItem("idEdit"),viewS:false,createS:false,deleteS:false,updateS:false,viewM:false,createM:false,deleteM:false,updateM:false})
   
    useEffect(async() => {
        //firts I will take from the JSON file with web server I create
        const userFromJSON = await axios.get("http://localhost:8001/users/userfile")
        const userData = userFromJSON.data
        console.log("userData")
        console.log(userData)
        const perFromJSON = await axios.get("http://localhost:8001/users/permissionsfile")
        const userDataPre = perFromJSON.data
        
        let createdC ="";
        let fNameC="";
        let lNameC="";
        
        const permissions ={
            viewS:false,
            createS:false,
            deleteS:false,
            updateS:false,
            viewM:false,
            createM:false,
            deleteM:false,
            updateM:false,

        }

        userDataPre.map((userJS,i)=>{
            if(userJS.id===sessionStorage.getItem("idEdit")){

                userJS.premissions.map((pre)=>{
               
                    switch(pre){
                        case "View Subscriptions":
                            permissions.viewS=true;
                            break;
                        case "Create Subscriptions":
                            permissions.createS=true;
                            break;
                        case "Delete Subscriptions":
                            permissions.deleteS=true;
                            break;
                        case "Update Subscriptions":
                            permissions.updateS=true;
                            break;

                        case "View Movies":
                            permissions.viewM=true;
                            break;
                        case "Create Movies":
                            permissions.createM=true;
                            break;
                        case "Delete Movies":
                            permissions.deleteM=true;
                            break;
                        case "Update Movies":
                            permissions.updateM=true;
                            break;
                        
                    }

                })

                

            }
        })

        await setUserPre({
            id:sessionStorage.getItem("idEdit"),
            viewS:permissions.viewS,
            createS:permissions.createS,
            deleteS:permissions.deleteS,
            updateS:permissions.updateS,
            viewM:permissions.viewM,
            createM:permissions.createM,
            deleteM:permissions.deleteM,
            updateM:permissions.updateM,
        })
        console.log(userPre)
        userData.map((userJS,i)=>{
            if(userJS.id===sessionStorage.getItem("idEdit")){
                createdC=userJS.created;
                fNameC = userJS.fName;
                lNameC=userJS.lName;
                

            }
        })
        console.log(fNameC)
        await setUser({created:createdC,fName:fNameC,lName:lNameC})
        console.log(user.fName)
        
        try{
            const userData = await axios.get(`http://localhost:${port}/users/${sessionStorage.getItem("idEdit")}`)
            const userDB = userData.data
            console.log(userDB)
            await setUser(user=>({...user,username:userDB.username}))
    
        }
        catch{

        }

    }, [])

    const handlEditing = (e)=>{
        setUser(user=>({...user,[e.target.name]:e.target.value}))
    }
    const handlCheckbox = (e)=>{
        //alert(e.target.checked)
        if(e.target.name==="createS")
            setUserPre(userPre=>({...userPre,[e.target.name]:e.target.checked,"viewS":true,"deleteS":true,"updateS":true}))
        else if(e.target.name==="createM")
            setUserPre(userPre=>({...userPre,[e.target.name]:e.target.checked,"viewM":true,"deleteM":true,"updateM":true}))
        else
            setUserPre(userPre=>({...userPre,[e.target.name]:e.target.checked}))
    }
    const updatePut = async(e)=>{
        ///first I will put in db server then in 
        const res = await axios.put(`http://localhost:${port}/users/${sessionStorage.getItem("idEdit")}`,
        {
            username:user.username,
        })
       
        //await sessionStorage.setItem("userName", user.username)
        //dispatch({ type: "USERIN", payload: user.username })

        const resPutUser = await axios.put(`http://localhost:${port}/users/userfile`
        ,
        {
            id:sessionStorage.getItem("idEdit"),
            fName:user.fName,
            lName:user.lName,
            created:user.created
        }
        )
        const perArr =[];
        userPre.viewS?perArr.push("View Subscriptions"):console.log("")
        userPre.createS?perArr.push("Create Subscriptions"):console.log("")
        userPre.createS?perArr.push("Delete Subscriptions"):console.log("")
        userPre.updateS?perArr.push("Update Subscriptions"):console.log("")
        userPre.viewM?perArr.push("View Movies"):console.log("")
        userPre.createM?perArr.push("Create Movies"):console.log("")
        userPre.deleteM?perArr.push("Delete Movies"):console.log("")
        userPre.updateM?perArr.push("Update Movies"):console.log("")

        const resPutPer = await axios.put(`http://localhost:${port}/users/permissionsfile`
        ,
        {
            id:sessionStorage.getItem("idEdit"),
            premissions:perArr
        }
        )
        //sessionStorage.setItem("perm",perArr)
        navigate("/usernanagement")
    }
  return <div>
      <h2>Edit page</h2>
      editing - {sessionStorage.getItem("idEdit")}
      <br/>
      <label>First Name </label>
      <input type={"text"} onChange={handlEditing} name="fName" value={user.fName} /><br/>
      <label>Last Name </label>
      <input type={"text"} onChange={handlEditing} name="lName" value={user.lName} /><br/>
      <label>Username </label>
      <input type={"text"} onChange={handlEditing} name="username" value={user.username} /><br/>
      <label>Created </label>
      <input type={"text"} onChange={handlEditing} name="created" value={user.created}disabled /><br/>
      <label>Session </label>
      <input type={"text"} onChange={handlEditing} name="session" disabled /><br/>

      <label>Permissions:  </label><br/>
      <label>Views Subscriptions<input type={"checkbox"} name="viewS" checked={userPre.viewS} onChange={handlCheckbox}/></label><br/>
      <label>Create Subscriptions<input type={"checkbox"} name="createS"  checked={userPre.createS} onChange={handlCheckbox} /></label><br/>
      <label>Delete Subscriptions<input type={"checkbox"} name="deleteS" checked={userPre.deleteS} onChange={handlCheckbox} /></label><br/>
      <label>Update Subscriptions<input type={"checkbox"} name="updateS" checked={userPre.updateS} onChange={handlCheckbox} /></label><br/>

      <label>Views Movies<input type={"checkbox"} name="viewM"  checked={userPre.viewM} onChange={handlCheckbox} /></label><br/>
      <label>Create Movies<input type={"checkbox"} name="createM" checked={userPre.createM} onChange={handlCheckbox}/></label><br/>
      <label>Delete Movies<input type={"checkbox"} name="deleteM" checked={userPre.deleteM} onChange={handlCheckbox}/></label><br/>
      <label>Update Movies<input type={"checkbox"} name="updateM" checked={userPre.updateM} onChange={handlCheckbox} /></label><br/>
      <button onClick={updatePut} >Update</button> <button onClick={()=>{navigate("/usernanagement")}}>Cancel</button>
  </div>;
}
