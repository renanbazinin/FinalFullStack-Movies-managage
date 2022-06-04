const mongoose  = require("mongoose")


const connectDB =  () =>{
    const uri = "mongodb://localhost:27017/SubscriptionsDB" // like URL but not Only for browesrs
    ///option for mongoose
    const options ={
        useNewUrlParser:true,
        useUnifiedTopology:true,
    
    };
    mongoose.connect(uri,options)
    
};

module.exports = connectDB;
