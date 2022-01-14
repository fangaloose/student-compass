const jwt = require("jsonwebtoken");

var configs = require('./configs')

const verifyToken = (req, res, next) => {

  const header = req.headers['authorization'];
  const bearer = header.split(' ');
  const token = bearer[1];


  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, configs.tokenKey);
    req.JWT = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const verifyRole = (arrRole) => (req,res,next) => {
  arrRole.includes(req.JWT.user.role) ? next() : res.status(403).send('You are not authorized to access this resource')
}

module.exports = {verifyToken,verifyRole};