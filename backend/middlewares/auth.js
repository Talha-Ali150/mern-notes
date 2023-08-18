const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (e) {
      res.status(401);
      console.log(e, "invalid token access denied");
    }
  }
  if (!token) {
    res.status(401);
    console.log("no token found");
  }
};

module.exports = { protect };
