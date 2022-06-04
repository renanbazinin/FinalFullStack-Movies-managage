const memberModel =  require("../models/memberMode");

const getAllMembers = ()=>{



    return new Promise((resolve,reject)=>{

        memberModel.find({},(err,Members)=>{
    
            
            if(err)
                reject(err)
            else{
                resolve(Members)
            }
        })
    })
    
    
}

const getMembersById = (id) =>{
    return new Promise((resolve,reject)=>{
        memberModel.findById(id,(err,Members)=>{
            if(err){
    
            }
            else
            {
                resolve(Members)
            }
        })

    })

}


const addMember = (newMembers) =>{
    //
    return new Promise((resolve,reject)=>{
        const Member = new memberModel(newMembers);

        Member.save((err)=>{
        if(err){
            console.log("faild")
            reject(err)
        
        }
        else
            resolve("Added!!")
        });
   
    });

};


const updateMembers = (id,MembersToUpdate)=>{
    return new Promise((resolve,reject)=>{
        memberModel.findByIdAndUpdate(id,MembersToUpdate,(err)=>{
            if(err)
                reject(err)
            else
                resolve("succesfully")
        })
    })

}

const deleteMembers = (id) =>{
    
    return new Promise((resolve,reject)=>{
    memberModel.findByIdAndRemove(id,(err)=>{
        if(err)
            reject(err)
        else{
            console.log("delet!!!!!!!!!!!!!! " + id)
            resolve("delete!!")
        }
    })
})

}




//addMovies(myMovies).then((response)=>console.log(response)).catch((err)=>console.log(err))

module.exports = {getAllMembers,getMembersById,addMember,updateMembers,deleteMembers}