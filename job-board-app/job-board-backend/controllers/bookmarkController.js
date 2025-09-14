const Bookmark = require("../models/bookmarkModel");

const bookmarkController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { jobId } = req.body;

    const alreadySaved = await Bookmark.findOne({ userId, jobId });
    if (alreadySaved) {
      await alreadySaved.deleteOne();
      res.status(200).json({ message: "Job unbookmarked" });
      return;
    }

    const saveJob = new Bookmark({ userId, jobId });
    await saveJob.save();
    return res.sendStatus(204); // equivalent to res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = bookmarkController;
