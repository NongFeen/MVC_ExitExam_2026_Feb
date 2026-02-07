const GeneralClaimModel = require("../models/GeneralClaimModel");
const LowIncomeClaimModel = require("../models/LowIncomeClaimModel");
const HighIncomeClaimModel = require("../models/HighIncomeClaimModel");
const MoneyClaimentModel = require("../models/MoneyModel");

const getClaimModel = (claimantType) => {
  switch (claimantType) {
    case "general":
      return GeneralClaimModel;
    case "low-income":
      return LowIncomeClaimModel;
    case "high-income":
      return HighIncomeClaimModel;
    default:
      return GeneralClaimModel;
  }
};

const getAllClaims = (req, res) => {
  try {
    const generalClaims = GeneralClaimModel.getAllClaims();
    const lowIncomeClaims = LowIncomeClaimModel.getAllClaims();
    const highIncomeClaims = HighIncomeClaimModel.getAllClaims();
    
    const allClaims = [...generalClaims, ...lowIncomeClaims, ...highIncomeClaims];
    res.json(allClaims);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "error loading claims data",
      error: error.message 
    });
  }
};

const getClaimsByType = (req, res) => {
  try {
    const { type } = req.params;
    const model = getClaimModel(type);
    const claims = model.getAllClaims();
    res.json(claims);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "error loading claims by type",
      error: error.message 
    });
  }
};

const getClaimById = (req, res) => {
  try {
    const { id } = req.params;
    
    const generalClaim = GeneralClaimModel.getClaimById(id);
    if (generalClaim) {
      return res.json({ ...generalClaim, claimType: "general" });
    }
    
    const lowIncomeClaim = LowIncomeClaimModel.getClaimById(id);
    if (lowIncomeClaim) {
      return res.json({ ...lowIncomeClaim, claimType: "low-income" });
    }
    
    const highIncomeClaim = HighIncomeClaimModel.getClaimById(id);
    if (highIncomeClaim) {
      return res.json({ ...highIncomeClaim, claimType: "high-income" });
    }
    
    res.status(404).json({ 
      success: false, 
      message: "Claim not found" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error loading claim data",
      error: error.message 
    });
  }
};

// find claims by claimant ID
const getClaimsByClaimantId = (req, res) => {
  try {
    const { claimantId } = req.params;
    
    const generalClaims = GeneralClaimModel.getClaimsByClaimantId(claimantId);
    const lowIncomeClaims = LowIncomeClaimModel.getClaimsByClaimantId(claimantId);
    const highIncomeClaims = HighIncomeClaimModel.getClaimsByClaimantId(claimantId);
    
    const allClaims = [...generalClaims, ...lowIncomeClaims, ...highIncomeClaims];
    res.json(allClaims);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error loading claims by claimant ID",
      error: error.message 
    });
  }
};

const addClaim = (req, res) => {
  try {
    const { claimantId, submissionDate, claimStatus = "pending" } = req.body;
    
    if (!claimantId || !submissionDate) {
      return res.status(400).json({ 
        success: false, 
        message: "Data is not complete" 
      });
    }

    const claimant = MoneyClaimentModel.getClaimantById(claimantId);
    if (!claimant) {
      return res.status(404).json({ 
        success: false, 
        message: "Claimant not found" 
      });
    }

    const model = getClaimModel(claimant.claimantType);
    const claim = model.addClaim(claimantId, submissionDate, claimStatus);
    
    res.json({ 
      success: true, 
      message: "Claim submitted successfully",
      claimId: claim.claimId,
      claimType: claimant.claimantType,
      data: claim 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error submitting claim",
      error: error.message 
    });
  }
};

const updateClaim = (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    
    let result = GeneralClaimModel.updateClaim(id, updatedData);
    if (result) {
      return res.json({ 
        success: true, 
        message: "update claim completed (General)",
        data: result 
      });
    }
    
    result = LowIncomeClaimModel.updateClaim(id, updatedData);
    if (result) {
      return res.json({ 
        success: true, 
        message: "update claim completed (Low-Income)",
        data: result 
      });
    }
    
    result = HighIncomeClaimModel.updateClaim(id, updatedData);
    if (result) {
      return res.json({ 
        success: true, 
        message: "update claim completed (High-Income)",
        data: result 
      });
    }
    
    res.status(404).json({ 
      success: false, 
      message: "Claim not found" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error updating claim data",
      error: error.message 
    });
  }
};

const deleteClaim = (req, res) => {
  try {
    const { id } = req.params;
    
    // Try to delete from all models
    if (GeneralClaimModel.getClaimById(id)) {
      GeneralClaimModel.deleteClaim(id);
      return res.json({ 
        success: true, 
        message: "ลบคำขอสำเร็จ (General)" 
      });
    }
    
    if (LowIncomeClaimModel.getClaimById(id)) {
      LowIncomeClaimModel.deleteClaim(id);
      return res.json({ 
        success: true, 
        message: "ลบคำขอสำเร็จ (Low-Income)" 
      });
    }
    
    if (HighIncomeClaimModel.getClaimById(id)) {
      HighIncomeClaimModel.deleteClaim(id);
      return res.json({ 
        success: true, 
        message: "ลบคำขอสำเร็จ (High-Income)" 
      });
    }
    
    res.status(404).json({ 
      success: false, 
      message: "ไม่พบข้อมูลคำขอเยียวยา" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "เกิดข้อผิดพลาด",
      error: error.message 
    });
  }
};

module.exports = {
  getAllClaims,
  getClaimsByType,
  getClaimById,
  getClaimsByClaimantId,
  addClaim,
  updateClaim,
  deleteClaim,
};
