const Quiz = require("../models/quizModel");

const getQuiz = async (req, res) => {
  const { userId, email } = req.user;

  const limit = parseInt(req.query.limit) || 10;
  const cursor = req.query.cursor;
  const search = req.query.search;

  let query = {};
  if (cursor) {
    query = { _id: { $lt: cursor } };
  }
  if (search) {
    query["quiz.title"] = { $regex: search, $options: "i" };
  }

  const quizzes = await Quiz.find(query)
    .sort({ createdAt: -1 })
    .limit(limit + 1)
    .populate("userId", "name email");

  let nextCursor = null;
  if (quizzes.length > limit) {
    nextCursor = quizzes[limit]._id.toString();
    quizzes.pop();
  }
  res.send({ quizzes, nextCursor });
};

const createQuiz = async (req, res) => {
  try {
    const userId = req.user.userId;
    const quiz = req.body;
    const newQuiz = new Quiz({ userId, quiz });
    await newQuiz.save();
    res.status(201).send("quiz created successfully");
  } catch (err) {
    res.status(500).send("failed to create quizz");
  }
};

module.exports = { getQuiz, createQuiz };
