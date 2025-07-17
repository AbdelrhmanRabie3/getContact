const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");
const {
  authenticateJWT,
  authorizeRoles,
} = require("../middlewares/auth.middleware");

router.use(authenticateJWT);
router.post("/", authorizeRoles("admin"), contactController.createContact);
module.exports = router;
