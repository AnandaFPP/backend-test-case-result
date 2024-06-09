const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const verifyOpts = {
    expiresIn: "1h",
    issuer: "library",
  };
  const token = jwt.sign(payload, process.env.SECRET_JWT_KEY, verifyOpts);
  return token;
};

const refreshToken = (payload) => {
  const verifyOpts = {
    expiresIn: "3h",
    issuer: "library",
  };
  const token = jwt.sign(payload, process.env.SECRET_JWT_KEY, verifyOpts);
  return token;
};


module.exports = { generateToken, refreshToken };
