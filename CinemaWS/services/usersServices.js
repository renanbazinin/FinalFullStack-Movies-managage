const userModel =  require("../models/userModel");
const jsonfile = require('jsonfile'); 



const getAllUsers = ()=>{



    return new Promise((resolve,reject)=>{

        userModel.find({},(err,Users)=>{
    
            
            if(err)
                reject(err)
            else{
                console.log("got it")
                resolve(Users)
            }
        })
    })
    
    
}

const getUsersById = (id) =>{
    return new Promise((resolve,reject)=>{
        userModel.findById(id,(err,Users)=>{
            if(err){
                reject(Users)
            }
            else
            {
                resolve(Users)
            }
        })

    })

}


const addUser = (newUsers) =>{
    //
    return new Promise((resolve,reject)=>{
        const User = new userModel(newUsers);

        User.save((err)=>{
        if(err){
            console.log("faild")
            reject(err)
        
        }
        else
            resolve(User)
        });
   
    });

};


const updateUsers = (id,UsersToUpdate)=>{
    return new Promise((resolve,reject)=>{
        userModel.findByIdAndUpdate(id,UsersToUpdate,(err)=>{
            if(err)
                reject(err)
            else
                resolve("succesfully")
        })
    })

}

const deleteUsers = (id) =>{
    
    return new Promise((resolve,reject)=>{
    userModel.findByIdAndRemove(id,(err)=>{
        if(err)
            reject(err)
        else{
            console.log("delet!!!!!!!!!!!!!! " + id)
            resolve("delete!!")
        }
    })
})

}


const userJSONRead = (userFiles) =>{
    
    return new Promise ((resolve,reject)=>{
        jsonfile.readFile(userFiles, (err, objArr)=>
        {
            if(err)
               reject( err)
    
            else
                resolve(objArr)
        })
    })

}

const userJSONReadById = (id,userFiles) =>{
    
    return new Promise ((resolve,reject)=>{
        jsonfile.readFile(userFiles, (err, objArr)=>
        {
            if(err)
               reject( err)
    
            else{
             
                const newObjarr = objArr.filter((user,i)=>{
                        return user.id===id
                    })
                resolve(newObjarr)
            }
        })
    })

}

const userJSONUpdate = async(userUpdated,userFiles) =>{
    const data = await userJSONRead(userFiles)
    const updatedJson = data.map((user)=>{
        if(userUpdated.id===user.id)
            return userUpdated
        return user;
    })

    return new Promise ((resolve,reject)=>{
        jsonfile.writeFile(userFiles,updatedJson, (err)=>
        {
            if(err)
               reject( err)
    
            else
                resolve(updatedJson)
        })
    })

}
const deleteUserJson = async(id,userFiles)=>{

    const data = await userJSONRead(userFiles)
    const updatedJson = data.filter((user)=>{
        if(user.id!==id)
            return user
        })
        return new Promise ((resolve,reject)=>{
            jsonfile.writeFile(userFiles,updatedJson, (err)=>
            {
                if(err)
                    reject( err)
        
                else
                    resolve(updatedJson)
            })
        })
    
}
const userJSONAdd = async(userAdd,userFiles) =>{
    let data = await userJSONRead(userFiles)
    console.log("got it")
    console.log(data)
    if(data!="")
        data.push(userAdd)
    else
        data = [userAdd]
    return new Promise ((resolve,reject)=>{
        jsonfile.writeFile(userFiles,data, (err)=>
        {
            if(err)
               reject( err)
    
            else
                resolve(data)
        })
    })

}

/*const deleteAlljson = async()=>{
    
}
*/
const deleteUserJsonAll = async(userFiles)=>{


        return new Promise ((resolve,reject)=>{
            jsonfile.writeFile(userFiles,"", (err)=>
            {
                if(err)
                    reject( err)
        
                else
                    resolve("empty json now :D")
            })
        })
    
}
const deleteCollection = async(dataDB)=>{

return new Promise((resolve,reject)=>{
    userModel.remove({},(err)=>{
        if(err)
            reject(err)
        else{
            console.log("delet!!!!!!!!!!!!!! all")
            resolve("delete!!")
        }
    })
})



}
//addMovies(myMovies).then((response)=>console.log(response)).catch((err)=>console.log(err))

module.exports = {getAllUsers,getUsersById,addUser,updateUsers,deleteUsers,userJSONRead,userJSONUpdate,userJSONAdd,userJSONReadById,deleteUserJson,deleteCollection,deleteUserJsonAll}