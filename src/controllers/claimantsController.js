const MoneyModel = require("../models/MoneyModel");

//#region Claimants
const getAllClaimants = (req, res) => {
  try {
    const claimants = MoneyModel.getAllClaimants();
    res.json(claimants);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "error loading data",
      error: error.message 
    });
  }
};

const getClaimantById = (req, res) => {
  try {
    const { id } = req.params;
    const claimant = MoneyModel.getClaimantById(id);
    if (claimant) {
      res.json(claimant);
    } else {
      res.status(404).json({ 
        success: false, 
        message: "ID not found" 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "error loading claimant data",
      error: error.message 
    });
  }
};

// Search by ThaiID
const searchClaimantByNationalId = (req, res) => {
  try {
    const { nationalId } = req.params;  
    // (isValidThaiID(nationalId));
    const claimant = MoneyModel.getClaimantByNationalId(nationalId);
    if (claimant) {
      res.json({
        success: true,
        found: true,
        data: claimant
      });
    } else {
      res.json({
        success: true,
        found: false,
        message: "ID not found"
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "error searching by ThaiID",
      error: error.message 
    });
  }
};

const registerNewClaimant = (req, res) => {
  try {
    const { nationalId, firstName, lastName, dateOfBirth, monthlyIncome } = req.body;
    if (!nationalId || !firstName || !lastName || !dateOfBirth || !monthlyIncome) {
      return res.status(400).json({ 
        success: false, 
        message: "Data is not complete" 
      });
    }
    
    //check dupe
    const existingClaimant = MoneyModel.getClaimantByNationalId(nationalId);
    if (existingClaimant) {
      return res.status(400).json({ 
        success: false, 
        message: "Error cannot be registered" //should tell client
      });
    }

    // claimant type base on income
    let claimantType = "general";
    if (monthlyIncome < 6500) {
      claimantType = "low-income";
    } else if (monthlyIncome >= 50000) {
      claimantType = "high-income";
    }

    // gen claimant ID
    const allClaimants = MoneyModel.getAllClaimants();
    let claimantId = "CLM" + String(allClaimants.length + 1).padStart(3, "0");

    const newClaimant = {
      claimantId,
      nationalId,
      firstName,
      lastName,
      dateOfBirth,
      monthlyIncome,
      claimantType
    };
    MoneyModel.addClaimant(newClaimant);

    res.json({ 
      success: true, 
      message: "Register Completed",
      data: newClaimant 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error registering claimant",
      error: error.message 
    });
  }
};

//crud 

const updateClaimant = (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    
    const result = MoneyModel.updateClaimant(id, updatedData);
    if (result) {
      res.json({ 
        success: true, 
        message: "update claimant completed",
        data: result 
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: "Claimant not found" 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error updating claimant data",
      error: error.message 
    });
  }
};

const deleteClaimant = (req, res) => {
  try {
    const { id } = req.params;
    MoneyModel.deleteClaimant(id);
    res.json({ 
      success: true, 
      message: "Delete claimant completed" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error deleting claimant data",
      error: error.message 
    });
  }
};

//#endregion

module.exports = {
  getAllClaimants,
  getClaimantById,
  searchClaimantByNationalId,
  registerNewClaimant,
  updateClaimant,
  deleteClaimant,
};
