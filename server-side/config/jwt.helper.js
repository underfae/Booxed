const jwt = require("jsonwebtoken");

module.exports.jwtVerification = (request, response, next) => {
  let jwtoken;

  if (request !== undefined && "authorization" in request.headers)
    jwtoken = request.headers["authorization"].split(" ")[1];

  if (!jwtoken)
    return response
      .status(403)
      .send({ auth: false, message: "Token not found" });
  else {
    jwt.verify(jwtoken, process.env.JWT_SECRET, (error, result) => {
      if (!error) {
        request._id = result._id;
        next();
      } else
        return response
          .stat(500)
          .send({ auth: false, message: "Token authentication has failed!" });
    });
  }
};