const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  createLead,
  getLeads,
  updateLead,
  deleteLead
} = require("../controllers/lead.controller");

router.use(authMiddleware);

router.post("/", createLead);
router.get("/", getLeads);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

module.exports = router;
