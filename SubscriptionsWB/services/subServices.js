const memberModel =  require("../models/subscriptionModel");

const getAllSubs = ()=>{



    return new Promise((resolve,reject)=>{

        memberModel.find({},(err,Subs)=>{
    
            
            if(err)
                reject(err)
            else{
                resolve(Subs)
            }
        })
    })
    
    
}

const getSubsById = (id) =>{
    return new Promise((resolve,reject)=>{
        memberModel.findById(id,(err,Subs)=>{
            if(err){
                reject(err)
            }
            else
            {
                resolve(Subs)
            }
        })

    })

}


const addMember = (newSubs) =>{
    //
    return new Promise((resolve,reject)=>{
        const Member = new memberModel(newSubs);

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


const updateSubs = (id,SubsToUpdate)=>{
    return new Promise((resolve,reject)=>{
        memberModel.findByIdAndUpdate(id,SubsToUpdate,(err)=>{
            if(err)
                reject(err)
            else
                resolve("succesfully")
        })
    })

}

const deleteSubs = (id) =>{
    
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

module.exports = {getAllSubs,getSubsById,addMember,updateSubs,deleteSubs}