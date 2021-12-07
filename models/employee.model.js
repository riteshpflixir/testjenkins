const mongoose=require('mongoose');

const employeeSchema = mongoose.Schema({
    empId : {type : Number ,unique : true},
    firstName : {type : String},
    lastName : {type : String},
    address : {type : String},
    dob : {type : Date},
    mobile : {type : String},
    city : {type : String},
    createdAt:{type:Date , default : new Date()},
    updatedAt:{type:Date , default : new Date()},
})

module.exports = {
    employeeSchema: mongoose.model("employee", employeeSchema, "employee"),
  };
  