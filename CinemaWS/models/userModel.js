const mongoose  = require("mongoose");
const Schema = mongoose.Schema;


//Schemaaa
const studentSchema = new Schema({
    
    username:{type:String , required:true},
    password:{type:String , required:true},
    
  


});

module.exports = mongoose.model('user',studentSchema);

