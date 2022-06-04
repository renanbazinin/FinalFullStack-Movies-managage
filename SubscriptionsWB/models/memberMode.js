const mongoose  = require("mongoose");
const Schema = mongoose.Schema;


//Schemaaa
const studentSchema = new Schema({
    
    name:{type:String , required:true},
    email:{type:String , required:true},
    city:String,
  


});

module.exports = mongoose.model('member',studentSchema);

