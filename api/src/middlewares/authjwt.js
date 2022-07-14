require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const headerToken = req.get("Authorization");
    if (!headerToken) {
      return res.status(401).json({ error: "Token not found" });
    }
    const token = headerToken.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.e_mail = decoded.user_email;
      next();
    } catch (error) {
      res.status(401).send(error);
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = verifyToken;
