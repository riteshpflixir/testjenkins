const employeeModel = require("../models/employee.model").employeeSchema;
const employeeService = require("../services/employee.service");


///create Device
exports.addEmployees = async (req, res) => {
  try {
    let result = await employeeService.saveEmployeeValue(req.body);
    if(result.status){
      return res.status(201).send({
         "message": "Employee Added Successfully",
         "status" : true 
        });
    }else{
      return res.status(500).send({
        "message": "Something Went Wrong",
        "status" : false 
       });
    }
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
};

//Fetch DeviceList
exports.fetchEmployeesList = async (req, res) => {
  var pageNo = parseInt(req.query.pageNo);
  var size = parseInt(req.query.size);
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
      response = {"error" : true,"message" : "Invalid page number, should start with 1"};
      return res.json(response)
  }
  query.skip = size * (pageNo -1);
  query.limit = size;
  query.pageNo = pageNo;
  try {
    let employeesList = await employeeService.fetchEmployeeDetails(query);
    if (!employeesList.status) {
      return res.status(500).send({
        status: false,
        message: employeesList.message,
        data: employeesList.data,
      });
    }
    // /**if data notfound */
    if (employeesList.status && employeesList.data.length == 0) {
      console.log(employeesList);
      return res
        .status(200)
        .send({ status: false, message: "No Data Found", data: employeesList.data });
    }

    // /**success response */
    return res.status(200).send({
      status: true,
      message: "Employees fetched successfully",
      data: employeesList.data,
      totalLength: employeesList.data.length,
    });
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
};

//Fetch employee list by id 
exports.fetchEmployeeListById = async (req, res) => {
  let findquery = {};
   
 if(req.query.id )
  {
    findquery['_id'] = req.query.id;
  }
  console.log(findquery);
  try {
    let employeesListById = await employeeService.fetchEmployeeDetailsById(findquery);
    // console.log("siteby",employeesListById);
    if (!employeesListById.status) {
      return res.status(500).send({
        status: false,
        message: employeesListById.message,
        data: employeesListById.data,
      });
    }
    // /**if data notfound */
    if (employeesListById.status && employeesListById.data.length == 0) {
      console.log(employeesListById);
      return res
        .status(200)
        .send({ status: false, message: "No Data Found", data: employeesListById.data });
    }

    // /**success response */
    return res.status(200).send({
      status: true,
      message: "Employee fetched successfully",
      data: employeesListById.data,
    });
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
};


// update employee details

exports.updateEmployee = async (req, res) => {
  let findquery = { _id: req.query.id };
  try {
    let updateemployeeDetail = await employeeService.updateEmployeeDetails(
      findquery,
      req.body
    );
    if (!updateemployeeDetail.status) {
      return res.status(500).send({
        status: false,
        message: updateemployeeDetail.message,
        data: updateemployeeDetail.data,
      });
    }

    // /**if data notfound */
    if (updateemployeeDetail.status && updateemployeeDetail.data.length == 0) {
      return res
        .status(200)
        .send({
          status: false,
          message: "No Data Found",
          data: updateemployeeDetail.data,
        });
    }

    // /**success response */
    return res.status(200).send({
      status: true,
      message: "Employee updated successfully",
      data: updateemployeeDetail.data,
      length: updateemployeeDetail.data.length,
    });
  } catch (error) {
    res.status(500).send({ errorMessage: err.message });
  }
};

// delete employee
exports.deleteEmployeeById = async (req, res) => {
  let findquery= {_id: req.query.id}

  try {
    let deleteemployeeDetail = await employeeService.deleteEmployeeDetails(findquery);
    if (!deleteemployeeDetail.status) {
      return res.status(500).send({
        status: false,
        message: deleteemployeeDetail.message,
        data: deleteemployeeDetail.data,
      });
    }

    // /**if data notfound */
    if (deleteemployeeDetail.status && deleteemployeeDetail.data.length == 0) {
      return res
        .status(200)
        .send({ status: false, message: "NotFound", data: deleteemployeeDetail.data });
    } 

    // /**success response */
    return res.status(200).send({
      status: true,
      message: "Employee deleted successfully",
      data: deleteemployeeDetail.data,
      length:deleteemployeeDetail.data.length,
    });
  }
   catch (error) {
   res.status(500).send({ errorMessage: err.message });
  }
};

