const BookmarkedJobs = require("../models/bookmarkModel");

const savedJobsController = async (req, res) => {
  const userId = req.user.userId;
  if (!userId) {
    return;
  }
  const savedJobs = await BookmarkedJobs.find({ userId })
    .sort({ updatedAt: -1 })
    .populate("jobId");
  const jobs = savedJobs.map((j) => ({ ...j.jobId._doc, isBookmarked: true }));

  res.status(200).json(jobs);
};
module.exports = savedJobsController;
