const Product = require("../models/Product");

// Service for statistics calculations
const statisticsService = {
  getTotalSaleAmount: async (month) => {
    // Implementation for calculating total sale amount
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
    
      return result.length > 0 ? result[0].totalAmount : 0;
  },

  getTotalSoldItems: async (month) => {
    const matchQuery = {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
        },
        sold: true,
      };
  
      return await Product.countDocuments(matchQuery);
  },

  getTotalNotSoldItems: async (month) => {
    const matchQuery = {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
        },
        sold: false,
      };
  
      // Calculate the total number of not sold items
      return await Product.countDocuments(matchQuery);
  },

  getBarChartData: async (month) => {
    const matchQuery = {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
        },
      };
  
      // Create the price ranges
      const priceRanges = [
        { min: 0, max: 100 },
        { min: 101, max: 200 },
        { min: 201, max: 300 },
        { min: 301, max: 400 },
        { min: 401, max: 500 },
        { min: 501, max: 600 },
        { min: 601, max: 700 },
        { min: 701, max: 800 },
        { min: 801, max: 900 },
        { min: 901, max: Infinity },
      ];
  
      // Calculate the bar chart data
      const pipeline = [
        {
          $match: matchQuery,
        },
        {
          $addFields: {
            priceRange: {
              $let: {
                vars: {
                  matchingRange: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: priceRanges,
                          as: "range",
                          cond: {
                            $and: [
                              { $gte: ["$price", "$$range.min"] },
                              { $lte: ["$price", "$$range.max"] },
                            ],
                          },
                        },
                      },
                      0,
                    ],
                  },
                },
                in: {
                  range: {
                    $concat: [
                      { $toString: "$$matchingRange.min" },
                      " - ",
                      { $toString: "$$matchingRange.max" },
                    ],
                  },
                  count: 1,
                },
              },
            },
          },
        },
        {
          $group: {
            _id: "$priceRange.range",
            count: { $sum: "$priceRange.count" },
          },
        },
        {
          $project: {
            _id: 0,
            range: "$_id",
            count: 1,
          },
        },
      ];
  
      const result = await Product.aggregate(pipeline).exec();
      return result.length > 0 ? result : [];
  },

  getPieChartData: async (month) => {
    // Implementation for generating pie chart data
    const matchQuery = {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
        },
      };
  
      // Group by category and count the number of items
      const pipeline = [
        {
          $match: matchQuery,
        },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            count: 1,
          },
        },
      ];
  
      const result = await Product.aggregate(pipeline).exec();
      return result.length > 0 ? result : [];
  },
};

module.exports = statisticsService;
