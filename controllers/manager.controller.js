const managerService = require("../services/manager.service");
const sha256 = require("sha256");
const genericHelper = require('../helpers/genericHelper')

// manager login
exports.managerLogin = async (req, res) => {
    let email=  {email: req.body.email}
    try {
      let managerExist = await managerService.fetchManagerDetails(email);
      /**if err return the response */
      console.log(managerExist);
      if (!managerExist.status) { 
        return res.status(500).send({
          message: managerExist.message,
          status: false
        });
      }
      /**if email not exist */
      if (managerExist.status && managerExist.data.length == 0) {
        return res.status(404).send({
          message: "User Not Found, Please Register",
          status: false
        });
      }
          // /**if password mismatch */
      if (managerExist.data[0].password !== sha256(req.body.password)) {
          return res.status(403).send({
          message: "login Failed due to incorrect email or password",
          status: false,
        });
      }
     
      /**if no errors then generate response */
      
      let response = {
        id: managerExist.data[0]._id,
        email: managerExist.data[0].email,
        managerName: managerExist.data[0].firstName,
        fullname: managerExist.data[0].firstName + " " + managerExist.data[0].lastName,
        token: "assignment"
      };
      var token = await genericHelper.CreateJWT(response);
      return res.status(200).send({
        message: "Login Success",
        status: true,
        data:response,
        token:token.data
      });
    } catch (err) {
      res.status(500).send({ message: err.message, status: false, data: [] });
    }
};


//register manager
exports.registerManager = async (req, res) => {
  try {
    let createmanagerPayload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        company: req.body.company,
        dob: req.body.dob,
        password: sha256(req.body.password),
      }
    var schemaPayload = managerService.saveManagerValue(createmanagerPayload)
      .then((response) => {
        res.status(201).send({
          message: "Created Manager ",
          status: true,
        });
      })
      .catch((error) => {
        if (error.message.includes("validation failed")) {
          res.status(400).send({
            message: error.message.toString().split(':').slice(1).join(':'),
            status: false,
          });
        } else {
          res.status(500).send({
            message:
              error.message ||
              "Some error occurred while Adding Manager.",
          });
        }
      });
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
};