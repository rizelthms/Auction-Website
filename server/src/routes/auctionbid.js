const express = require("express");
const router = express.Router();
const { generateUniqueId, createBid, getDatabase } = require("../utils");
const DatabaseAPI = require("../databaseapi");
const AuctionBid = require("../models/auctionbid");
const AuctionItem = require("../models/auctionitem");
const { sendError, sendSuccess } = require("../response.handler");

// Create a new bid for an item
router.post("/", async (req, res) => {
  let { itemId, bidAmount, bidBy } = req.body;
  bidAmount = parseFloat(bidAmount);

  let id = generateUniqueId();
  let bid = createBid({ id, itemId, bidAmount, bidBy });

  // Find the item
  let item = DatabaseAPI.getItemById(itemId);

  if (!item) {
    sendError({message: "Item doesn't exist"}, res);
    return;
  }

  // Reject bids that are below the current bid amount
  if (item.currentBid && bidAmount <= item.currentBid) {
    sendError({message: "Bid amount is too low"}, res);
    return;
  }

  item.currentBid = bidAmount;

  DatabaseAPI.addANewBid(bid);
  sendSuccess({ bid }, res);
});

// Get the details of a single bid
router.get("/bid/:bidId", async (req, res) => {
  let bid = DatabaseAPI.getBidById(req.params.bidId);
  if (!bid) {
    sendError({message: "Could not find bid with the given ID"}, res);
  }
  bid.itemId = DatabaseAPI.getItemById(bid.itemId);
  sendSuccess({ bid }, res);
});

// Get all bids for the given item
router.get("/item/:itemId", async (req, res) => {
  let { itemId } = req.params;
  let item = DatabaseAPI.getItemById(itemId);

  if (!item) {
    sendError({message: "Item doesn't exist" }, res);
  }

  let bids = DatabaseAPI.getBidsForItem(itemId);
  bids.sort((a, b) => a.bidAmount - b.bidAmount); // sort by bidAmount
  sendSuccess({ bids, item }, res);
});

router.delete("/:bidId", async (req, res) => {
  let { bidId } = req.params;
  let bids = DatabaseAPI.getBidById(bidId);
  if (!bids) {
    sendError({message: "Bid doesn't exist"}, res);
    return;
  }
  let newBids = DatabaseAPI.deleteMyBid(bidId);

  let highestBid = DatabaseAPI.getHighestBidForItem(bids.itemId);
  DatabaseAPI.updateItem(bids.itemId, highestBid ? highestBid.bidAmount : null);
  // sendSuccess({ data: newBids }, res);

  sendSuccess({}, res);
});

router.post("/user/bid", async (req, res) => {
  let { userName } = req.body;
  let bids = DatabaseAPI.getAllBids();
  bids = bids.filter((e) => e.bidBy === userName);
  sendSuccess({ bids }, res);
});

module.exports = router;
