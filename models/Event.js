const { Schema, model } = require('mongoose');

const CATEGORIES = ['taller', 'charla', 'seminario', 'hackathon'];

const eventSchema = new Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  date:        { type: Date, required: true },
  location:    { type: String, required: true, trim: true },
  capacity:    { type: Number, required: true, min: 1 },
  category:    { type: String, required: true, enum: CATEGORIES }
}, { timestamps: true });

module.exports = model('Event', eventSchema);
module.exports.CATEGORIES = CATEGORIES;
