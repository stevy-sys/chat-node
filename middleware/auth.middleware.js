const jwt = require("jsonwebtoken");
const { User } = require("../models/");

module.exports.checkUser = async (req, res, next) => {
  const token = await req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await User.findOne({ where: { id: decodedToken.id } });
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.send(200).json({ message: "no token" });
      } else {
        next();
      }
    });
  } else {
    console.log("No token");
  }
};
