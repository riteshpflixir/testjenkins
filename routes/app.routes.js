var appRouter = {};
const genericHelper = require("../helpers/genericHelper");

appRouter.initialize = (app) =>{
  const middleware = async (req, res, next) => {
    // return next();
    if (typeof req.headers.token == "undefined" || req.headers.token === null) {
      return res
        .status(400)
        .send({ status: false, message: "Please pass token", data: [] });
    }
    let jwtverify = await genericHelper.jwtVerify(req.headers.token);
    if (jwtverify.status) {
      console.log("Authentication Success");
      return next();
    }
    console.log("Authentication Failed");
    return res
      .status(401)
      .send({ status: false, message: "unauthorized-access", data: [] });
  };

  /*### default route ###*/
  var manager = require("../routes/manager.routes");
  app.use('/api/manager',manager);
  var employee = require("../routes/employee.routes");
  app.use('/api/employee',middleware,employee);
  // app.use('/api/employee',employee);

};
module.exports = appRouter;