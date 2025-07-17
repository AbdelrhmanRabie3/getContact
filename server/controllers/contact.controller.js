const ContactService = require("../services/contact.service");
const createContact = async (req, res) => {
  try {
    const contact = await ContactService.createContact(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 5, Name, Phone, Address } = req.query;
    const result = await ContactService.getContacts({
      page,
      limit,
      Name,
      Phone,
      Address,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const contact = await ContactService.updateContact(req.params.id, req.body);
    if (contact === "locked") {
      return res
        .status(423)
        .json({ message: "Contact is locked by another user" });
    }
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const lockContact = async (req, res) => {
  try {
    const { lockedBy } = req.body;
    const result = await ContactService.lockContact(
      req.params.id,
      lockedBy,
      req.app.get("io")
    );
    if (result === "locked") {
      return res
        .status(423)
        .json({ message: "Contact is already locked by another user" });
    }
    if (!result) return res.status(404).json({ message: "Contact not found" });
    res.json({ lockedBy });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const unlockContact = async (req, res) => {
  try {
    const result = await ContactService.unlockContact(
      req.params.id,
      req.app.get("io")
    );
    if (!result) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact unlocked" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  createContact,
  getContacts,
  updateContact,
  lockContact,
  unlockContact,
};
