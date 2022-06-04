const mongoose  = require("mongoose");
const Schema = mongoose.Schema;


//Schemaaa
const studentSchema = new Schema({
    
    name:{type:String , required:true},
    genres:{type:Array , required:true},
    image:String,
    premiered:Date,


});

module.exports = mongoose.model('movie',studentSchema);

