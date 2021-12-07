const mongoose=require('mongoose');

const managerSchema = mongoose.Schema({
    firstName : {type : String},
    lastName : {type : String},
    email : {type : String},
    address : {type : String},
    company : {type : String},
    dob : {type : Date},
    password : {type : String},
    createdAt:{type:Date , default : new Date()},
    updatedAt:{type:Date , default : new Date()},
})

module.exports = {
    managerSchema: mongoose.model("manager", managerSchema, "manager"),
  };
  