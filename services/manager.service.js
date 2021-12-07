const managerModel = require('../models/manager.model').managerSchema;

module.exports = {
  saveManagerValue: async (payload) => {
    try {
      let managerPayloadObject = new managerModel(payload);
      let result = await managerPayloadObject.save();
      if (result) {
        return { status: true, data: result, message: "ok" };
      }
      return { status: false, data: result, message: "faild to save" };
    } catch (error) {
      return { status: false, data: [], message: error.message };
    }
  },

  fetchManagerDetails: async (findquery) => {
    try {
      let result = await managerModel.find(findquery);
      if (result) {
        return { status: true, data: result, message: "ok" };
      }else if(result.length == 0){
        return{
          status : false,
          message : "No Records Present."
        }
      }
      return { status: false, data: result, message: "faild to get result" };
    } catch (error) {
      return {
        status: false,
        message: `MongoError: ${error.message}`,
        data: [],
      };
    }
  },
};
