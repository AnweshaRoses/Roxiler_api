const express = require("express");

const router = express.Router();

// Import statisticsController
const statisticsController = require("../controllers/statisticsController");

// API endpoints for statistics
// localhost:5000/api/statistics/totalSold/12
router.get("/:month", statisticsController.getTotalSaleAmount);
router.get("/totalSold/:month", statisticsController.getTotalSoldItems);
router.get("/totalNotSold/:month", statisticsController.getTotalNotSoldItems);
router.get("/barChart/:month", statisticsController.getBarChartData);
router.get("/pieChart/:month", statisticsController.getPieChartData);
router.get("/combined/:month", statisticsController.getCombinedStatistics);

module.exports = router;
