require("dotenv").config();
require("./config/db");

const express = require("express");
const app = express();

const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const authMiddleware = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");
const quizzesRoutes = require("./routes/quizzesRoutes");

app.use("/", authRoutes);

app.use("/quizzes", authMiddleware, quizzesRoutes);

app.listen(PORT, () => console.log("server is listening"));
