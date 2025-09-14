require("dotenv").config();
require("./config/db");

const express = require("express");
const server = express();
const PORT = process.env.PORT;
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const authMiddleware = require("./middleware/authMiddleware");
const optionalAuthMiddleware = require("./middleware/optionalAuthMiddleware");

server.use(cors());
server.use(express.json());

server.use("/", authRoutes);
server.use("/jobs", optionalAuthMiddleware, jobRoutes);
server.use("/dashboard", authMiddleware, dashboardRoutes);

server.listen(PORT, () => {
  console.log("server is running");
});
