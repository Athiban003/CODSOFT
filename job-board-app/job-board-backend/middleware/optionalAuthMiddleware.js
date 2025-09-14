const jwt = require("jsonwebtoken");

const optionalAuthMiddleware = (req, res, next) => {
  try {
    const bearer = req.headers?.authorization;

    if (!bearer || !bearer.startsWith("Bearer")) {
      return next();
    }
    const token = bearer.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = decoded;
  } catch (err) {
    console.error("Invalid token, continuing as guest");
  }
  next();
};
module.exports = optionalAuthMiddleware;
