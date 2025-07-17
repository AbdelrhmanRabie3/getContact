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

const updateContact = async (id, { Name, Phone, Address, Notes, lockedBy }) => {
  const contact = await Contact.findById(id);
  if (!contact) return null;
  if (contact.lockedBy && contact.lockedBy !== lockedBy) {
    return "locked";
  }
  contact.Name = Name;
  contact.Phone = Phone;
  contact.Address = Address;
  contact.Notes = Notes;
  await contact.save();
  return contact;
};

const lockContact = async (id, lockedBy, io) => {
  const contact = await Contact.findById(id);
  if (!contact) return null;
  if (contact.lockedBy && contact.lockedBy !== lockedBy) {
    return "locked";
  }
  contact.lockedBy = lockedBy;
  contact.lockedAt = new Date();
  await contact.save();
  if (io) io.emit("contactLocked", { id: contact._id, lockedBy });
  return contact;
};

const unlockContact = async (id, io) => {
  const contact = await Contact.findById(id);
  if (!contact) return null;
  contact.lockedBy = null;
  contact.lockedAt = null;
  await contact.save();
  if (io) io.emit("contactUnlocked", { id: contact._id });
  return contact;
};

const deleteContact = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);
  return contact;
};
module.exports = {
  createContact,
  getContacts,
  lockContact,
  updateContact,
  unlockContact,
  deleteContact
};
