const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.CreateJWT = async (signinData) => {
  try {
    const token = await jwt.sign({ signinData }, config.jwt.secret, {
      expiresIn: config.jwt.TokenLife, // expires in 24 hours
    });
    return {
      status: true,
      message: "token generated sucessfully",
      data: token,
    };
  } catch (error) {
    return { status: false, message: `JWTError: ${error.message}`, data: [] };
  }
};

exports.jwtVerify = async (token) => {
  try {
    let verify = jwt.verify(token, config.jwt.secret);
    // //console.log("verified details", verify)
    if (verify) {
      return {
        status: true,
        code: 200,
        message: "authentication success",
        data: [],
        Keyword: "ok",
      };
    }
    return {
      status: false,
      code: 500,
      message: "something went wrong while verify",
      data: [],
      Keyword: "internal-error",
    };
  } catch (error) {
    return {
      status: false,
      code: 401,
      message: `JwtVerifyError: ${error.message}`,
      data: [],
      Keyword: error.name,
    };
  }
};


