const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  school: { type: String, required: true },
  bayArea: { type: String, required: true },
  guild: { type: String, required: true },
  solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  respectPoints: { type: Number, default: 0 },
  joinDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
