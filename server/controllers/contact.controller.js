const ContactService = require("../services/contact.service");
const createContact = async (req, res) => {
  try {
    const contact = await ContactService.createContact(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = { createContact };
