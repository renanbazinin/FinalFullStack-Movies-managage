const mongoose  = require("mongoose");
const Schema = mongoose.Schema;


//Schemaaa
const studentSchema = new Schema({
    
    memberId:{type:String , required:true},
    movies:{type:Array , required:true},


});

module.exports = mongoose.model('sub',studentSchema);

