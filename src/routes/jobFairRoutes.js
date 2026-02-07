const express = require("express");
const router = express.Router();
const claimsController = require("../controllers/claimsController");
const claimantsController = require("../controllers/claimantsController");
const policiesController = require("../controllers/policiesController");
const compensationsController = require("../controllers/compensationsController");

router.get("/claimants", claimantsController.getAllClaimants);
router.post("/claimants/register", claimantsController.registerNewClaimant);
router.get("/claimants/search/:nationalId", claimantsController.searchClaimantByNationalId);
router.get("/claimants/:id", claimantsController.getClaimantById);
router.post("/claimants", claimantsController.addClaimant);
router.put("/claimants/:id", claimantsController.updateClaimant);
router.delete("/claimants/:id", claimantsController.deleteClaimant);

router.get("/claims", claimsController.getAllClaims);
router.get("/claims/type/:type", claimsController.getClaimsByType);
router.get("/claims/:id", claimsController.getClaimById);
router.get("/claims/claimant/:claimantId", claimsController.getClaimsByClaimantId);
router.post("/claims", claimsController.addClaim);
router.put("/claims/:id", claimsController.updateClaim);
router.delete("/claims/:id", claimsController.deleteClaim);

router.get("/policies", policiesController.getAllPolicies);
router.get("/policies/:id", policiesController.getPolicyById);
router.get("/policies/condition/:condition", policiesController.getPolicyByIncomeCondition);

router.get("/compensations", compensationsController.getAllCompensations);
router.get("/compensations/:claimId", compensationsController.getCompensationByClaimId);
router.post("/compensations", compensationsController.addCompensation);
router.post("/compensations/calculate", compensationsController.calculateCompensation);
router.put("/compensations/:claimId", compensationsController.updateCompensation);
router.delete("/compensations/:claimId", compensationsController.deleteCompensation);

module.exports = router;
