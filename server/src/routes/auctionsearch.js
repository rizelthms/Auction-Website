const express = require("express");
const router = express.Router();
const DatabaseAPI = require("../databaseapi");
const AuctionItem = require("../models/auctionitem");

// Search for auctions
router.get("/", async (req, res) => {
  let items = DatabaseAPI.searchObjects(AuctionItem, {});
  res.status(200).json(items);
});

module.exports = router;
