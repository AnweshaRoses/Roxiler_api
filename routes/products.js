const router = require("express").Router()
const Product=require("../models/Product")
const mongoose=require("mongoose")
const axios = require('axios');



// API endpoint to initialize the database
router.get('/getall', async (req, res) => {
  try {
    // Fetch JSON data from the third-party API
    const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
    const response = await axios.get(url);
    const data = response.data;

    // Initialize the database with seed data
    await Product.insertMany(data);

    res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports=router
