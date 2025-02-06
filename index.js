const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./db');    // MongoDB connection
const MenuItem = require('./models/MenuItem');   // MenuItem model

const app = express();
const port = 3010;

// Middleware to parse incoming JSON data
app.use(express.json());  

// Connect to MongoDB
connectDB();

// Serve static files from the 'static' directory
app.use(express.static('static'));

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages', 'index.html'));
});

// Route to update an existing menu item
app.put('/menu/:id', async (req, res) => {
  const { name, description, price } = req.body;

  // Validate required fields
  if (!name || !price) {
    return res.status(400).send('Name and price are required.');
  }

  try {
    // Find and update the menu item by its ID
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,  // The ID from the URL
      { name, description, price },  // The fields to update
      { new: true }  // Return the updated document
    );

    // If no menu item is found, send a 404 error
    if (!updatedMenuItem) {
      return res.status(404).send('Menu item not found.');
    }

    // Send the updated menu item in the response
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating menu item.');
  }
});

// Route to delete a menu item
app.delete('/menu/:id', async (req, res) => {
  try {
    // Find and delete the menu item by its ID
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);

    // If no menu item is found, send a 404 error
    if (!deletedMenuItem) {
      return res.status(404).send('Menu item not found.');
    }

    // Send a success message upon successful deletion
    res.status(200).send('Menu item deleted.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting menu item.');
  }
});

// Start the server and listen on port 3010
app.listen(port, () => {
  connectDB()
  console.log(`Example app listening at http://localhost:${port}`);
});
