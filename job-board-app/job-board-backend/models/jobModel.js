const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    job_id: { type: String, required: true },
    job_title: { type: String, required: true },
    job_employement_type: String,
    job_qualifications: String,
    job_benefits: String,
    job_responsibilities: String,
    company_name: { type: String, required: true },
    company_website: { type: String },
    job_location: { type: String, required: true },
    job_description: String,
    job_apply_link: String,
  },
  { timestamps: true }
);

jobSchema.index({ job_title: "text" });
jobSchema.index({ job_location: 1 });

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
