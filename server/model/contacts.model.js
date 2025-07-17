const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\+?[0-9\-\s]{7,15}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  Address: {
    type: String,
    required: true,
  },
  Notes: {
    type: String,
    required: false,
  },
  lockedBy: { type: String, default: null },
  lockedAt: { type: Date, default: null },
});
module.exports = mongoose.model("Contact", contactSchema);
