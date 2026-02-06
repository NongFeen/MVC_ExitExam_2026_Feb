const express = require("express");
const router = express.Router();
// const petController = require("../controllers/jobFairController");
const jobFairController = require("../controllers/jobFairController");
const jobFairAdminController = require("../controllers/jobFairAdminController");

//route of api then call in controller
router.get("/allcandidate/", jobFairAdminController.getAllCandidate);
router.get(
  "/candidatedetail/:id",
  jobFairAdminController.getCandidateDetailById
);
router.get("/joblist", jobFairController.getJobList);
router.get("/jobdetail/:id", jobFairController.getJobAndCompanyDetailByJobId);
router.post("/applyjob", jobFairController.applyJob);

module.exports = router;
