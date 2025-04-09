const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  avatar: {
    type: String,
    default: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  attendance: { type: Boolean, default: false },
  totalAmount: { type: Number, default: 850 },
  amountPaid: { type: Boolean, default: false },
  pendingAmount: { type: Number, default: 850 },
  history: [
    {
      date: { type: Date, default: Date.now },
      updatedAmount: { type: Number, required: true },
    }
  ]
});

module.exports = mongoose.model('Visitor', visitorSchema);
