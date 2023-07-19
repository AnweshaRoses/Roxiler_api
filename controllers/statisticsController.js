const statisticsService = require("../services/statisticsService")

const statisticsController = {
  getTotalSaleAmount: async (req, res) => {
    try {
        const { month } = req.params;
    
        const totalSaleAmount = await statisticsService.getTotalSaleAmount(month);
    
        res.json({ success: true, totalSaleAmount });
     
      } catch (error) {
        console.error("Error calculating total sale amount:", error);
        res.status(500).json({ error: "Internal server error" });
      }
  },

  getTotalSoldItems: async (req, res) => {
    try {
        const { month } = req.params;
    
      
        // Calculate the total number of sold items
        const totalSold = await statisticsService.getTotalSoldItems(month);
    
        res.json({success:true, totalSold });
      } catch (error) {
        console.error("Error calculating total sold items:", error);
        res.status(500).json({ error: "Internal server error" });
      }
  },

  getTotalNotSoldItems: async (req, res) => {
    try {
        const { month } = req.params;
    
        // Calculate the total number of not sold items
        const totalNotSold = await statisticsService.getTotalNotSoldItems(month)
    
        res.json({success:true, totalNotSold });
      } catch (error) {
        console.error("Error calculating total not sold items:", error);
        res.status(500).json({ error: "Internal server error" });
      }
  },

  getBarChartData: async (req, res) => {
    try {
        const { month } = req.params;
    
        const barChart = await statisticsService.getBarChartData(month)
    
        res.json({ success:true, barChart });
      } catch (error) {
        console.error("Error generating bar chart:", error);
        res.status(500).json({ error: "Internal server error" });
      }
  },

  getPieChartData: async (req, res) => {
    try {
        const { month } = req.params;
    
    
        const pieChart = await statisticsService.getPieChartData(month)
    
        res.json({ success:true, pieChart });
      } catch (error) {
        console.error("Error generating pie chart:", error);
        res.status(500).json({ error: "Internal server error" });
      }
  },

  getCombinedStatistics: async (req, res) => {
    try {
        const { month } = req.params;
    
        const totalSaleAmountPromise =await statisticsService.getTotalSaleAmount(month);
        const totalSoldItemsPromise =await statisticsService.getTotalSoldItems(month);
        const totalNotSoldItemsPromise =await statisticsService.getTotalNotSoldItems(month);
        const barChartPromise =await statisticsService.getBarChartData(month);
        const pieChartPromise =await statisticsService.getPieChartData(month);
    
        const [
          totalSaleAmount,
          totalSoldItems,
          totalNotSoldItems,
          barChart,
          pieChart,
        ] = await Promise.all([
          totalSaleAmountPromise,
          totalSoldItemsPromise,
          totalNotSoldItemsPromise,
          barChartPromise,
          pieChartPromise,
        ]);
    
        const combinedData = {
          totalSaleAmount,
          totalSoldItems,
          totalNotSoldItems,
          barChart,
          pieChart,
        };
    
        res.json({success:true,combinedData});
      } catch (error) {
        console.error("Error fetching combined statistics data:", error);
        res.status(500).json({ error: "Internal server error" });
      }
  },
};

module.exports = statisticsController;
