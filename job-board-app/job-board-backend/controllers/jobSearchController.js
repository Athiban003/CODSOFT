const Job = require("../models/jobModel");
const Bookmark = require("../models/bookmarkModel");

async function searchInDb(title, location) {
  const query = {};
  if (title) {
    query.$text = { $search: title };
  }
  if (location) {
    query.job_location = { $regex: location, $options: "i" };
  }
  const jobs = await Job.find(
    query,
    title ? { relevance: { $meta: "textScore" } } : {}
  )
    .select({})
    .sort({ createdAt: 1 });

  return jobs;
}

const jobSearch = async (req, res) => {
  try {
    const { title, location } = req.query;
    let { page } = req.query;
    const userId = req.user?.userId;

    let jobs = await searchInDb(title, location);

    const required = page * 10;
    let currentCount = jobs.length;

    while (currentCount < required && page <= 50) {
      const result = await fetch(
        `https://jsearch.p.rapidapi.com/search?query=${title}%20jobs%20in%20${location}&page=${page}&num_pages=5&country=IN&date_posted=all`,
        {
          headers: {
            "x-rapidapi-key": process.env.RAPID_SEARCH_API_2,
            "x-rapidapi-host": "jsearch.p.rapidapi.com",
          },
        }
      );
      const resultJson = await result.json();
      const { data } = resultJson;
      if (!data) break;

      let addedCount = 0;
      for (const value of data) {
        const job_id = value.job_id;

        const existingJob = await Job.findOne({ job_id });
        if (existingJob) {
          continue;
        }
        const job_title = value.job_title;
        const job_employement_type = value.job_employment_type;
        const job_qualifications = value.job_highlights?.Qualifications || null;
        const job_benefits = value.job_benefits;
        const job_responsibilities =
          value.job_highlights.Responsibilities || null;
        const company_name = value.employer_name;
        const company_website = value.employer_website;
        const job_location = value.job_location;
        const job_description = value.job_description;
        const job_apply_link = value.job_apply_link || null;
        const jobData = new Job({
          job_id,
          job_title,
          job_employement_type,
          job_qualifications,
          job_benefits,
          job_responsibilities,
          company_name,
          company_website,
          job_location,
          job_description,
          job_apply_link,
        });
        await jobData.save();
        addedCount += 1;
      }
      if (addedCount === 0) {
        break;
      } else {
        currentCount += addedCount;
      }
    }
    jobs = await searchInDb(title, location);
    slicedData = jobs.slice((page - 1) * 10, page * 10);
    if (slicedData.length === 0) {
      return res.status(200).json([]);
    }
    if (userId) {
      const bookmarks = await Bookmark.find({ userId });
      const bookmarksId = new Set(bookmarks.map((j) => j.jobId.toString()));

      slicedData = slicedData.map((j) => {
        return {
          ...j._doc,
          isBookmarked: bookmarksId.has(j._id.toString()),
        };
      });
    }
    res.status(200).json(slicedData);
  } catch (error) {
    console.error(error);
  }
};
module.exports = jobSearch;
