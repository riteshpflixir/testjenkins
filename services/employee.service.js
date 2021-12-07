const employeeModel = require('../models/employee.model').employeeSchema;

module.exports = {
  saveEmployeeValue: async (payload) => {
    try {
      let employeePayloadObject = new employeeModel(payload);
      let result = await employeePayloadObject.save();
      if (result) {
        return { status: true, data: result, message: "ok" };
      }
      return { status: false, data: result, message: "Failed to Save" };
    } catch (error) {
      return { status: false, data: [], message: error.message };
    }
  },

  fetchEmployeeDetails: async (query) => {
    try {
      let size = query.limit;
      let page = query.pageNo;
      var totalCounts = await employeeModel.countDocuments();
      var result = await employeeModel.find({},{},query).sort({createdAt:-1});
      if (result) {
        return {
          status: true,
          data: {
            "totalItems": totalCounts,
            "totalPages": Math.ceil(totalCounts / size),
            "pageNumber": page,
            "pageSize": result.length,
            "employeeData": result
          },
          message: "ok"
        };
      }else if(result.length == 0){
        return{
          status : false,
          message : "No Records Present."
        }
      }
      return { status: false, data: result, message: "Failed to get Result" };
    } catch (error) {
      return {
        status: false,
        message: `MongoError: ${error.message}`,
        data: [],
      };
    }
  },

  //getById
  fetchEmployeeDetailsById: async (query) => {
    try {
      var result = await employeeModel.find(query)
      if (result) {
        return {
          status: true,
          data: result,
          message: "ok"
        };
      }else if(result.length == 0){
        return{
          status : false,
          message : "No Records Present."
        }
      }
      return { status: false, data: result, message: "Failed to get Result" };
    } catch (error) {
      return {
        status: false,
        message: `MongoError: ${error.message}`,
        data: [],
      };
    }
  },

  //update data
  updateEmployeeDetails: async (constraints, update) => {
    //console.log(constraints);
    try {
      let result = await employeeModel.findOneAndUpdate(constraints, update, {
        new: true,
      });
      if (result) {
        return { status: true, data: result, message: "Ok" };
      }
      return { status: false, data: result, message: "Failed to Update" };
    } catch (error) {
      return {
        status: false,
        message: `MongoError: ${error.message}`,
        data: [],
      };
    }
  },


  deleteEmployeeDetails: async (constraints) => {
    //console.log(constraints);
    try {
      let result = await employeeModel.findOneAndDelete(constraints);
      if (result) {
        return { status: true, data: result, message: "Ok" };
      }
      return { status: false, data: result, message: "Failed to Delete" };
    } catch (error) {
      return {
        status: false,
        message: `MongoError: ${error.message}`,
        data: [],
      };
    }
  },

};
