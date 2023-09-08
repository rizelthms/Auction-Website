/* Represents an individual bid for an auction item. */
class AuctionBid {
  constructor(id, itemId, bidAmount, bidBy) {
    this.id = id;
    this.itemId = itemId;
    this.bidAmount = bidAmount;
    this.createdAt = new Date();
    this.bidBy = bidBy;
  }
}

module.exports = AuctionBid;
