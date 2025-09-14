const express = require("express");
const router = express.Router();

const jobSearch = require("../controllers/jobSearchController");

router.get("/", jobSearch);

module.exports = router;
