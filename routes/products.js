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
router.get("/statistics/:month", async (req, res) => 
{
  try {
    const { month } = req.params;

    // Extract the month from the dateOfSale field using MongoDB aggregation
    const pipeline = [
      {
        $addFields: {
          month: {
            $toInt: {
              $dateToString: {
                format: "%m",
                date: "$dateOfSale",
              },
            },
          },
        },
      },
      {
        $match: {
          month: parseInt(month),
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
        },
      },
    ];
    

    const result = await Product.aggregate(pipeline).exec();

    const totalSaleAmount = result.length > 0 ? result[0].totalAmount : 0;

    res.json({ success: true, totalSaleAmount });
 
  } catch (error) {
    console.error("Error calculating total sale amount:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/statistics/totalSold/:month", async (req, res) => {
  try {
    const { month } = req.params;

    // Match documents with the selected month
    const matchQuery = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
      },
      sold: true,
    };

    // Calculate the total number of sold items
    const totalSold = await Product.countDocuments(matchQuery);

    res.json({ totalSold });
  } catch (error) {
    console.error("Error calculating total sold items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/statistics/totalNotSold/:month", async (req, res) => {
  try {
    const { month } = req.params;

    // Match documents with the selected month
    const matchQuery = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
      },
      sold: false,
    };

    // Calculate the total number of not sold items
    const totalNotSold = await Product.countDocuments(matchQuery);

    res.json({ totalNotSold });
  } catch (error) {
    console.error("Error calculating total not sold items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports=router
