const fs = require("fs");
const path = require("path");

const files = {
  companies: path.join(__dirname, "CompaniesData.json"),
  jobs: path.join(__dirname, "JobsData.json"),
  candidates: path.join(__dirname, "CandidatesData.json"),
  applications: path.join(__dirname, "ApplicationsData.json"),
};

// Read JSON file
const readJSON = (file) => {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8"));
};
// write files for all json
const writeJSON = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
};

//#region company
exports.getAllCompanies = () => readJSON(files.companies);
exports.getCompanyByID = (id) => {
  const companies = exports.getAllCompanies();
  return companies.find((company) => company.companyId === id);
};
exports.addCompany = (company) => {
  //gen Unique ID
  company.companyId = generateCompanyId();
  //company contian Company_Name,Email,Location
  const companies = exports.getAllData();
  companies.push(company);
  //   fs.writeFileSync(bootsFilePath, JSON.stringify(companies, null, 2), "utf8");

  //TODO reject
  return true;
};
//#endregion

//#region Job
exports.getAllJob = () => readJSON(files.jobs);
exports.getJobByID = (id) => {
  const companies = exports.getAllJob();
  return companies.find((job) => job.jobId === id);
};
exports.addJob = (job) => {
  const jobs = exports.getAllJobs();
  job.jobId = generateJobId();
  jobs.push(job);
  writeJSON(files.jobs, jobs);
  return job;
};
// exports.getCompanyIDbyJobID = ()
//#endregion

exports.getJobAndCompanyDetailByJobId = (jobId) => {
  const jobs = exports.getAllJob();
  const job = jobs.find((j) => j.jobId === jobId);
  if (!job) return null;

  const company = exports.getCompanyByID(job.companyId); // get company info from job
  return { job, company };
};

//#region Candidates
exports.getAllCandidates = () => readJSON(files.candidates);
exports.getCandidatebyID = (id) => {
  const companies = exports.getAllCandidates();
  return companies.find((candidate) => candidate.candidateId === id);
};
exports.addCandidate = (candidate) => {
  const candidates = exports.getAllCandidates();
  candidate.candidateId = generateCandidateId();
  candidates.push(candidate);
  writeJSON(files.candidates, candidates);
  return candidate;
};

//#region Application
exports.getAllApplications = () => readJSON(files.applications);
exports.addApplications = (jobId, candidateId) => {
  const candidate = exports.getCandidatebyID(candidateId);
  if (!candidate) throw new Error("Candidate not found");

  const job = exports.getJobByID(jobId);
  if (!job) throw new Error("Job not found");

  const applications = exports.getAllApplications();
  if (applications.some((app) => app.jobId === jobId)) {
    throw new Error("Candidate already applied to this job");
  }
  //dead line check
  const currentDate = new Date();
  const deadlineDate = new Date(job.deadline);
  if (currentDate > deadlineDate) {
    throw new Error("Cannot apply: deadline has passed");
  }

  const newApplication = {
    jobId,
    candidateId,
    applyDate: new Date().toISOString().split("T")[0], // format YYYY-MM-DD
  };
  applications.push(newApplication);
  writeJSON(files.applications, applications);

  return newApplication;
};
exports.getAllApplicationsByCandidateID = (candidateId) => {
  const allApplications = exports.getAllApplications();
  return allApplications.filter((app) => app.candidateId === candidateId);
};
// gen unique ID by looking all id in database
const generateCompanyId = () => {
  let companyId;
  let companies;
  do {
    companyId = Math.floor(10000000 + Math.random() * 90000000);
    companies = exports.getAllCompanies();
  } while (companies.some((c) => c.companyId === companyId));
  return companyId;
};
const generateJobId = () => {
  let jobId;
  let jobs;
  do {
    jobId = Math.floor(10000000 + Math.random() * 90000000);
    jobs = exports.getAllJobs();
  } while (jobs.some((j) => j.jobId === jobId));
  return jobId;
};
const generateCandidateId = () => {
  let candidateId;
  let candidates;
  do {
    candidateId = Math.floor(10000000 + Math.random() * 90000000);
    candidates = exports.getAllCandidates();
  } while (candidates.some((c) => c.candidateId === candidateId));
  return candidateId;
};
