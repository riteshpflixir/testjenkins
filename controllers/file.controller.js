const formModel = require("../models/file.model").fileSchema;

///create file
exports.addFormData = async (req, res) => {
    response = req.body;
    response.date = new Date(req.body.date).toISOString();
    console.log(response);
    try {
      var data = new formModel(response);
      await data
        .save()
        .then((response) => {
          res.status(201).send({
            message: "Form Data Added Successfully",
            status: true,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: error.message || "Some error occurred while adding.",
          });
        });
    } catch (error) {
      res.status(500).send({ errorMessage: error.message });
    }
  };
  
  exports.fetchFormData = async (req, res) => {
    try {
      let formData = await formModel.find({});
      let currentDate = new Date().toLocaleString();
      formData.forEach(async (element) => {
        let savedDate = new Date(element.date).toLocaleString();
        console.log(savedDate);
        console.log(currentDate);
          if(savedDate == currentDate){
              console.log("yessssss");
              await formModel.findByIdAndRemove({_id:element._id});
          }
      });
      // /**success response */
      return res.status(200).send({
        message: "Data Fetched",
        status: true,
        data : formData,
      });
    } catch (error) {
      res.status(500).send({ errorMessage: err.message });
    }
  };
  