const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  first_name: {
    type: String,
    minlength: 3,
    maxlength: 60,
  },
  last_name: {
    type: String,
    minlength: 3,
    maxlength: 60,
    unique: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sudo',
  },
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = { Admin };
