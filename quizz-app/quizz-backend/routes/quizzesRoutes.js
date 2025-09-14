const express = require("express");
const router = express.Router();

const { getQuiz, createQuiz } = require("../controllers/quizController");

router.get("/", getQuiz);

router.post("/create", createQuiz);

module.exports = router;
