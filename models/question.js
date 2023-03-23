const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  text: { type: String, required: true },
  choices: [{ type: String, required: true }],
  answer: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
});

module.exports = mongoose.model('Question', questionSchema);
