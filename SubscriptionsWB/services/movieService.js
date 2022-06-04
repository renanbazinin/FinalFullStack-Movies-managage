const movieModel =  require("../models/movieModel");

const getAllMovies = ()=>{



    return new Promise((resolve,reject)=>{

        movieModel.find({},(err,Movies)=>{
    
            
            if(err)
                reject(err)
            else{
                resolve(Movies)
            }
        })
    })
    
    
}

const getMoviesById = (id) =>{
    return new Promise((resolve,reject)=>{
        movieModel.findById(id,(err,Movies)=>{
            if(err){
    
            }
            else
            {
                resolve(Movies)
            }
        })

    })

}


const addMovie = (newMovies) =>{
    //
    return new Promise((resolve,reject)=>{
        const Movies = new movieModel(newMovies);

        Movies.save((err)=>{
        if(err){
            console.log("faild")
            reject(err)
        
        }
        else
            resolve("Added!!")
        });
   
    });

};


const updateMovies = (id,MoviesToUpdate)=>{
    return new Promise((resolve,reject)=>{
        movieModel.findByIdAndUpdate(id,MoviesToUpdate,(err)=>{
            if(err)
                reject(err)
            else
                resolve("succesfully")
        })
    })

}

const deleteMovies = (id) =>{
    
    return new Promise((resolve,reject)=>{
    movieModel.findByIdAndRemove(id,(err)=>{
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

module.exports = {getAllMovies,getMoviesById,addMovie,updateMovies,deleteMovies}