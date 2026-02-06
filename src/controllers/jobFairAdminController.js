const jobFairModel = require("../models/JobFairModel");

exports.getAllCandidate = (req, res) => {
  try {
    const candidates = jobFairModel.getAllCandidates(); // get data from model
    res.status(200).json(candidates); // send as JSON
    // console.log("Get all Candidate");
    // console.log(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching candidates" });
  }
};

exports.getCandidateDetailById = (req, res) => {
  try {
    const candidateId = parseInt(req.params.id, 10);
    const candidate = jobFairModel.getCandidatebyID(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const applications =
      jobFairModel.getAllApplicationsByCandidateID(candidateId);
    // get job company
    const jobApplications = applications.map((app) => {
      const job = jobFairModel.getJobByID(app.jobId);
      //find company
      const company = job ? jobFairModel.getCompanyByID(job.companyId) : null;
      return {
        jobId: app.jobId,
        jobTitle: job ? job.jobTitle : "N/A",
        companyName: company ? company.companyName : "N/A",
        applyDate: app.applyDate,
      };
    });
    res.status(200).json({
      candidate,
      applications: jobApplications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching candidate details" });
  }
};
