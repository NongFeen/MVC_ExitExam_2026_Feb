const fs = require("fs");
const path = require("path");

const files = {
  claimants: path.join(__dirname, "ClaimantsData.json"),
  policies: path.join(__dirname, "PoliciesData.json"),
  compensations: path.join(__dirname, "CompensationsData.json"),
};

const readJSON = (file) => {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8"));
};

const writeJSON = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
};

const getAllClaimants = () => {
  return readJSON(files.claimants);
};
const getClaimantById = (claimantId) => {
  const claimants = readJSON(files.claimants);
  return claimants.find((c) => c.claimantId === claimantId);
};
const getClaimantByNationalId = (nationalId) => {
  const claimants = readJSON(files.claimants);
  return claimants.find((c) => c.nationalId === nationalId);
};
const addClaimant = (claimant) => {
  const claimants = readJSON(files.claimants);
  claimants.push(claimant);
  writeJSON(files.claimants, claimants);
  return claimant;
};
const updateClaimant = (claimantId, updatedData) => {
  const claimants = readJSON(files.claimants);
  const index = claimants.findIndex((c) => c.claimantId === claimantId);
  if (index !== -1) {
    claimants[index] = { ...claimants[index], ...updatedData };
    writeJSON(files.claimants, claimants);
    return claimants[index];
  }
  return null;
};
const deleteClaimant = (claimantId) => {
  const claimants = readJSON(files.claimants);
  const filtered = claimants.filter((c) => c.claimantId !== claimantId);
  writeJSON(files.claimants, filtered);
  return true;
};

//#region POLICIES
const getAllPolicies = () => {
  return readJSON(files.policies);
};
const getPolicyById = (policyId) => {
  const policies = readJSON(files.policies);
  return policies.find((p) => p.policyId === policyId);
};
// Get policy by income condition
const getPolicyByIncomeCondition = (incomeCondition) => {
  const policies = readJSON(files.policies);
  return policies.find((p) => p.incomeCondition === incomeCondition);
};
// Add new policy
const addPolicy = (policyId, maxAmount, incomeCondition) => {
  const policies = readJSON(files.policies);
  const newPolicy = {
    policyId,
    maxAmount,
    incomeCondition,
  };
  policies.push(newPolicy);
  writeJSON(files.policies, policies);
  return newPolicy;
};
const updatePolicy = (policyId, updatedData) => {
  const policies = readJSON(files.policies);
  const index = policies.findIndex((p) => p.policyId === policyId);
  if (index !== -1) {
    policies[index] = { ...policies[index], ...updatedData };
    writeJSON(files.policies, policies);
    return policies[index];
  }
  return null;
};
const deletePolicy = (policyId) => {
  const policies = readJSON(files.policies);
  const filtered = policies.filter((p) => p.policyId !== policyId);
  writeJSON(files.policies, filtered);
  return true;
};
//#endregion

//#region 
const getAllCompensations = () => {
  return readJSON(files.compensations);
};
const getCompensationByClaimId = (claimId) => {
  const compensations = readJSON(files.compensations);
  return compensations.find((c) => c.claimId === claimId);
};
const addCompensation = (claimId, compensationAmount, calculationDate) => {
  const compensations = readJSON(files.compensations);
  const newCompensation = {
    claimId,
    compensationAmount,
    calculationDate,
  };
  compensations.push(newCompensation);
  writeJSON(files.compensations, compensations);
  return newCompensation;
};
const updateCompensation = (claimId, updatedData) => {
  const compensations = readJSON(files.compensations);
  const index = compensations.findIndex((c) => c.claimId === claimId);
  if (index !== -1) {
    compensations[index] = { ...compensations[index], ...updatedData };
    writeJSON(files.compensations, compensations);
    return compensations[index];
  }
  return null;
};
const deleteCompensation = (claimId) => {
  const compensations = readJSON(files.compensations);
  const filtered = compensations.filter((c) => c.claimId !== claimId);
  writeJSON(files.compensations, filtered);
  return true;
};
//#endregion
module.exports = {
  getAllClaimants,
  getClaimantById,
  getClaimantByNationalId,
  addClaimant,
  updateClaimant,
  deleteClaimant,

  getAllPolicies,
  getPolicyById,
  getPolicyByIncomeCondition,
  addPolicy,
  updatePolicy,
  deletePolicy,

  getAllCompensations,
  getCompensationByClaimId,
  addCompensation,
  updateCompensation,
  deleteCompensation,
};
