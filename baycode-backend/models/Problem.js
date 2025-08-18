const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { 
    type: String, 
    enum: ['easy', 'medium', 'hard', 'extreme'], 
    required: true 
  },
  leetcodeUrl: { type: String, required: true }
});

module.exports = mongoose.model('Problem', ProblemSchema);
