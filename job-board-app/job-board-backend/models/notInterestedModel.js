const mongoose = require("mongoose");

const notInterestedSchema = mongoose.Schema({
  userId: { type: String, required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
});

const NotInterested = mongoose.model("NotInterested", notInterestedSchema);

module.exports = NotInterested;
