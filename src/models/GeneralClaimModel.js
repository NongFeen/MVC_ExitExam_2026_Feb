const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "GeneralClaimsData.json");

const readJSON = () => {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8"));
};

const writeJSON = (data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
};

const getAllClaims = () => {
  return readJSON();
};

const getClaimById = (claimId) => {
  const claims = readJSON();
  return claims.find((c) => c.claimId === claimId);
};

const getClaimsByClaimantId = (claimantId) => {
  const claims = readJSON();
  return claims.filter((c) => c.claimantId === claimantId);
};

const addClaim = (claimantId, submissionDate, claimStatus = "pending") => {
  const claims = readJSON();
  let claimId = Math.floor(Math.random() * 90000000) + 10000000; // 8-digit starting with 1-9
  
  // check dupe
  while (claims.some((c) => c.claimId === claimId.toString())) {
    claimId = Math.floor(Math.random() * 90000000) + 10000000;
  }

  const newClaim = {
    claimId: claimId.toString(),
    claimantId,
    submissionDate,
    claimStatus,
  };
  claims.push(newClaim);
  writeJSON(claims);
  return newClaim;
};

const updateClaim = (claimId, updatedData) => {
  const claims = readJSON();
  const index = claims.findIndex((c) => c.claimId === claimId);
  if (index !== -1) {
    claims[index] = { ...claims[index], ...updatedData };
    writeJSON(claims);
    return claims[index];
  }
  return null;
};

const deleteClaim = (claimId) => {
  const claims = readJSON();
  const filtered = claims.filter((c) => c.claimId !== claimId);
  writeJSON(filtered);
  return true;
};

// general income (6500 <= income <= 50000)
// max 20000
const calculateCompensation = (claimantId, claimId, moneyModel) => {
  try {
    const claimant = moneyModel.getClaimantById(claimantId);
    if (!claimant) {
      throw new Error("not found claimant data");
    }

    if (claimant.claimantType !== "general") {
      throw new Error("not General Claim Model");
    }

    const monthlyIncome = claimant.monthlyIncome;
    if (monthlyIncome < 6500 || monthlyIncome > 50000) {
      throw new Error("wrong income for general claimant");
    }

    const compensationAmount = Math.min(monthlyIncome, 20000);
    const compensation = moneyModel.addCompensation(
      claimId,
      compensationAmount,
      new Date().toISOString().split("T")[0]
    );

    return {
      success: true,
      claimId: claimId,
      claimantId: claimantId,
      claimType: "general",
      monthlyIncome: monthlyIncome,
      compensationAmount: compensationAmount,
      calculationDate: compensation.calculationDate,
      message: "Calculation successful"
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  getAllClaims,
  getClaimById,
  getClaimsByClaimantId,
  addClaim,
  updateClaim,
  deleteClaim,
  calculateCompensation,
};
