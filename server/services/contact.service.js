const Contact = require("../model/contacts.model");

const createContact = async ({ Name, Phone, Address, Notes }) => {
  const contact = new Contact({ Name, Phone, Address, Notes });
  await contact.save();
  return contact;
};

const getContacts = async ({ page = 1, limit = 5, Name, Phone, Address }) => {
  const filter = {};
  if (Name) filter.Name = { $regex: Name, $options: "i" };
  if (Phone) filter.Phone = { $regex: Phone, $options: "i" };
  if (Address) filter.Address = { $regex: Address, $options: "i" };
  const contacts = await Contact.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const total = await Contact.countDocuments(filter);
  return { contacts, total };
};

module.exports = { createContact,getContacts };
