/* Represents a single item listed as an auction on the site. */
class AuctionItem {
  constructor(id, description, author, type, year, startingBid, endAt) {
    this.id = id;
    this.description = description;
    this.author = author;
    this.type = type;
    this.year = year;
    this.createdAt = new Date();
    this.startingBid = startingBid;
    this.currentBid = null; // Set when first bid placed
    this.endAt = endAt;
  }
}

module.exports = AuctionItem;
