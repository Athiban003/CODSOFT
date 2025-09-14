const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const reqHeader = req.headers?.authorization;
    if (!reqHeader || !reqHeader.startsWith("Bearer")) {
      res.status(401).send({ message: "No token found" });
      return;
    }
    const token = reqHeader.split(" ")[1];
    if (!token) {
      res.status(401).send({ message: "No token found" });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ message: "Invalid token" });
  }
};
module.exports = authMiddleware;
