module.exports = {
    serverHost : '127.0.0.1',
    serverPort : process.env.PORT || 3000,
    dbUrl : "mongodb://127.0.0.1:27017/mindbowserTest",

    jwt: {
        TokenLife: 86400,
        secret: "machineTest",
      },
 };