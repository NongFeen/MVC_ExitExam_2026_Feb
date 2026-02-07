const MoneyModel = require("../models/MoneyModel");
const GeneralClaimModel = require("../models/GeneralClaimModel");
const LowIncomeClaimModel = require("../models/LowIncomeClaimModel");
const HighIncomeClaimModel = require("../models/HighIncomeClaimModel");

//#region Compensation
const getAllCompensations = (req, res) => {
  try {
    const compensations = MoneyModel.getAllCompensations();
    res.json(compensations);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error loading compensations data",
      error: error.message 
    });
  }
};

const getCompensationByClaimId = (req, res) => {
  try {
    const { claimId } = req.params;
    const compensation = MoneyModel.getCompensationByClaimId(claimId);
    if (compensation) {
      res.json(compensation);
    } else {
      res.status(404).json({ 
        success: false, 
        message: "Compensation data not found" 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error getting compensation data",
      error: error.message 
    });
  }
};

const addCompensation = (req, res) => {
  try {
    const { claimId, compensationAmount, calculationDate } = req.body;
    
    if (!claimId || compensationAmount === undefined || !calculationDate) {
      return res.status(400).json({ 
        success: false, 
        message: "Data is not complete" 
      });
    }

    const compensation = MoneyModel.addCompensation(claimId, compensationAmount, calculationDate);
    res.json({ 
      success: true, 
      message: "compensation added completed",
      data: compensation 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error adding compensation",
      error: error.message 
    });
  }
};

const updateCompensation = (req, res) => {
  try {
    const { claimId } = req.params;
    const updatedData = req.body;
    
    const result = MoneyModel.updateCompensation(claimId, updatedData);
    if (result) {
      res.json({ 
        success: true, 
        message: "Updated compensation data successfully",
        data: result 
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: "Compensation data not found" 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error updating compensation data",
      error: error.message 
    });
  }
};

const deleteCompensation = (req, res) => {
  try {
    const { claimId } = req.params;
    MoneyModel.deleteCompensation(claimId);
    res.json({ 
      success: true, 
      message: "delete compensation completed" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error deleting compensation data",
      error: error.message 
    });
  }
};

// cal composation 
const calculateCompensation = (req, res) => {
  try {
    const { claimantId, claimId } = req.body;
    
    if (!claimantId || !claimId) {
      return res.status(400).json({ 
        success: false, 
        message: "Data is not complete" 
      });
    }

    const claimant = MoneyModel.getClaimantById(claimantId);
    if (!claimant) {
      return res.status(404).json({ 
        success: false, 
        message: "Claimant data not found" 
      });
    }
    // get correct model for policy
    const claimModel = getClaimModel(claimant.claimantType);
    const result = claimModel.calculateCompensation(claimantId, claimId, MoneyModel);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error calculating compensation",
      error: error.message 
    });
  }
};

//get model base on claiman
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
//#endregion

module.exports = {
  getAllCompensations,
  getCompensationByClaimId,
  addCompensation,
  updateCompensation,
  deleteCompensation,
  calculateCompensation,
};
