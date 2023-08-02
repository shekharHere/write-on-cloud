const mongoose = require('mongoose');

const { Schema } = mongoose;

const notesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // setting type to save data (i.e. userid in this case) from a diff Schema 
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    default: "General"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('notes', notesSchema);
