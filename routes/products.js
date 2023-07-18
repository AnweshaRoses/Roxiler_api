const router = require("express").Router()
const Product=require("../models/Product")
const mongoose=require("mongoose")
const axios = require('axios');

const {getTotalSaleAmount,getTotalSoldItems,getTotalNotSoldItems,getBarChartData,getPieChartData} =require("../controllers/functions")

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
router.get("/statistics/:month", async (req, res) => 
{
  try {
    const { month } = req.params;

    const totalSaleAmount = await getTotalSaleAmount(month);

    res.json({ success: true, totalSaleAmount });
 
  } catch (error) {
    console.error("Error calculating total sale amount:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/statistics/totalSold/:month", async (req, res) => {
  try {
    const { month } = req.params;

  
    // Calculate the total number of sold items
    const totalSold = await getTotalSoldItems(month);

    res.json({ totalSold });
  } catch (error) {
    console.error("Error calculating total sold items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/statistics/totalNotSold/:month", async (req, res) => {
  try {
    const { month } = req.params;

    // Calculate the total number of not sold items
    const totalNotSold = await getTotalNotSoldItems(month)

    res.json({ totalNotSold });
  } catch (error) {
    console.error("Error calculating total not sold items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/statistics/barChart/:month", async (req, res) => {
  try {
    const { month } = req.params;

    const barChart = await getBarChartData(month)

    res.json({ barChart });
  } catch (error) {
    console.error("Error generating bar chart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/statistics/pieChart/:month", async (req, res) => {
  try {
    const { month } = req.params;


    const pieChart = await getPieChartData(month)

    res.json({ pieChart });
  } catch (error) {
    console.error("Error generating pie chart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports=router
