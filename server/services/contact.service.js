const Contact = require("../model/contacts.model");

const createContact = async ({ Name, Phone, Address, Notes }) => {
  const contact = new Contact({ Name, Phone, Address, Notes });
  await contact.save();
  return contact;
};

module.exports = { createContact };
