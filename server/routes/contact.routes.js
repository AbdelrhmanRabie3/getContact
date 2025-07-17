const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");
const {
  authenticateJWT,
  authorizeRoles,
} = require("../middlewares/auth.middleware");

router.use(authenticateJWT);
router.get("/", contactController.getContacts);
router.post(
  "/",
  authorizeRoles("admin", "user"),
  contactController.createContact
);
router.put(
  "/:id",
  authorizeRoles("admin", "user"),
  contactController.updateContact
);
router.patch(
  "/:id/lock",
  authorizeRoles("admin", "user"),
  contactController.lockContact
);
router.patch(
  "/:id/unlock",
  authorizeRoles("admin", "user"),
  contactController.unlockContact
);
module.exports = router;
