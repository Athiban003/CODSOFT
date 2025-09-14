const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const bearer = req.headers?.authorization;
  if (!bearer || !bearer.startsWith("Bearer")) {
    res.status(401).json("no token found");
    return;
  }
  try {
    const token = bearer.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json("Invalid token");
  }
};
module.exports = authMiddleware;
