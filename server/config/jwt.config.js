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
  // try {
  //   const token = req.headers.authorization.split(' ')[1];
  //   const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  //   const userId = decodedToken.userId;
  //   if (req.body.userId && req.body.userId !== userId) {
  //     throw 'Invalid user ID';
  //   } else {
  //     // req.userId = userId;
  //     // console.log(userId)
  //     next();
  //   }
  // } catch {
  //   res.status(401).json({
  //     error: new Error('Invalid request!')
  //   });
  // }
}