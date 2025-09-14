const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const bookmarkController = require("../controllers/bookmarkController");

const savedJobsController = require("../controllers/savedJobsController");

router.get("/", dashboardController);

router.post("/bookmark", bookmarkController);

router.get("/saved-jobs", savedJobsController);

module.exports = router;
