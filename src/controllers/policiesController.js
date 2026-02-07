const MoneyModel = require("../models/MoneyModel");

//#region Policies
const getAllPolicies = (req, res) => {
  try {
    const policies = MoneyModel.getAllPolicies();
    res.json(policies);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error loading policies data",
      error: error.message 
    });
  }
};

const getPolicyById = (req, res) => {
  try {
    const { id } = req.params;
    const policy = MoneyModel.getPolicyById(id);
    if (policy) {
      res.json(policy);
    } else {
      res.status(404).json({ 
        success: false, 
        message: "Policy not found" 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error getting policy",
      error: error.message 
    });
  }
};

// Get policy by income condition
const getPolicyByIncomeCondition = (req, res) => {
  try {
    const { condition } = req.params;
    const policy = MoneyModel.getPolicyByIncomeCondition(condition);
    if (policy) {
      res.json(policy);
    } else {
      res.status(404).json({ 
        success: false, 
        message: "Policy not found" 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error getting policy by income condition",
      error: error.message 
    });
  }
};

//#endregion

module.exports = {
  getAllPolicies,
  getPolicyById,
  getPolicyByIncomeCondition,
};
