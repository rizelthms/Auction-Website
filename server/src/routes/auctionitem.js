const express = require("express");
const { generateUniqueId, createItem, getDatabase } = require("../utils");
const router = express.Router();
const AuctionItem = require("../models/auctionitem");
const DatabaseAPI = require("../databaseapi");
const { sendError, sendSuccess } = require("../response.handler");
const {
  authenticate_request_admin,
  authenticate_request_user,
} = require("../middleware/authentication.js");

// Create a new auction item listing
router.post("/", async (req, res) => {
  let { description, author, type, year, startingBid, endAt } = req.body;

  let id = generateUniqueId();

  let item = createItem({ id, description, author, type, year, startingBid, endAt });
  item = DatabaseAPI.addANewItem(item);

  sendSuccess({ message: item }, res);
});

// Get the details for an auction
router.get("/:auctionId", async (req, res) => {
  let { auctionId } = req.params;
  let item = DatabaseAPI.getItemById(auctionId);
  sendSuccess({ data: item }, res);
});

router.delete("/:itemId", authenticate_request_admin, async (req, res) => {
  let { itemId } = req.params;
  let item = DatabaseAPI.getItemById(itemId);
  if (!item) {
    sendError({message: "Item doesn't exist"}, res);
    return;
  }
  let items = DatabaseAPI.deleteItem(itemId);
  let bids = DatabaseAPI.deleteBidsByItemId(itemId);
  sendSuccess({ items }, res);
});

// Auction item list
router.get("/", async (req, res) => {
  let item = DatabaseAPI.getAllItems();
  sendSuccess({ item }, res);
});

router.get("/search/item", async (req, res) => {
  let item = DatabaseAPI.getAllItems();
  let { name } = req.query;
  let regex = new RegExp(name, "gi");
  item = item.filter((e) => {
    return regex.test(e.description);
  });
  sendSuccess({ item }, res);
});
module.exports = router;
