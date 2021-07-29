const { sign } = require("jsonwebtoken");

const generateToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports= generateToken;
