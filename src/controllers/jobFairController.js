const jobFairModel = require("../models/JobFairModel");

exports.getJobList = (req, res) => {
  try {
    console.log("get job list");
    const allJobs = jobFairModel.getAllJob();
    const joblist = allJobs.map((job) => {
      const company = jobFairModel.getCompanyByID(job.companyId);
      return {
        ...job,
        companyName: company ? company.companyName : "N/A",
      };
    });

    res.status(200).json(joblist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching open jobs" });
  }
};
exports.getJobAndCompanyDetailByJobId = (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const detail = jobFairModel.getJobAndCompanyDetailByJobId(jobId);

    if (!detail) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(detail); // { job, company }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching job detail" });
  }
};

exports.applyJob = (req, res) => {
  try {
    const { jobId, candidateId } = req.body;
    const newApplication = jobFairModel.addApplications(jobId, candidateId);
    res.status(200).json({
      message: "Application submitted successfully",
      application: newApplication,
    });
  } catch (err) {
    // should shown seperate status for error
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
