const mongoose = require('mongoose');

// Define the schema for the menu items
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Name of the menu item (required)
  description: { type: String, default: '' },   // Description of the menu item (optional)
  price: { type: Number, required: true },      // Price of the menu item (required)
});

// Create the model based on the schema
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
