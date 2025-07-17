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

module.exports = { createContact, getContacts };
