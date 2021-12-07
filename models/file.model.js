const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  name : {type: String},
  description : {type: String},
  date : {type: Date,default : Date.now(),expires:5},
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
  
});

fileSchema.index({"date":1},{expireAfterSeconds : 5});

module.exports = {
    fileSchema: mongoose.model("fileModel", fileSchema, "fileModel"),
};
