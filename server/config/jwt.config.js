const jwt = require("jsonwebtoken");
const secret_key = "This is my secret key";
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, secret_key, (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false});
    } else {
      next();
    }
  });
}