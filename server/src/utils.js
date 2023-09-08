const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const fs = require("fs");
const User = require("./models/user");
var jwt = require("jsonwebtoken");
const AuctionItem = require("./models/auctionitem");
const AuctionBid = require("./models/auctionbid");

const saltRounds = 10;

/* Generate a unique identifier as a string. */
function generateUniqueId() {
  return uuidv4();
}

/* Hash a string using bcrypt. Useful for passwords. */
function bcryptHash(text) {
  return bcrypt.hashSync(text, saltRounds);
}

/** Decrypt password */
function compareHash(password, hash) {
  return bcrypt.compare(password, hash);
}

const getDatabase = function () {
  return new Promise((resolve, reject) => {
    fs.readFile("./database.json", "utf8", (error, database) => {
      if (database) {
        resolve(JSON.parse(database));
      }
      if (error) {
        fs.writeFile(
            "./database.json",
            JSON.stringify({}),
            (error, database) => {
              resolve(JSON.parse("{}"));
            }
        );
      }
    });
  });
};

const writeToDatabase = function (j_son) {
  fs.writeFile("./database.json", JSON.stringify(j_son), "utf8", (err, data) => {
    console.log("Saved to DB");
  });
};

const createUser = function (data) {
  let { name, password } = data;
  let user = new User(generateUniqueId(), name, bcryptHash(password), false);
  return { ...user };
};

const createAuthToken = function(userInfo, isAdmin) {
  if (isAdmin) {
    return jwt.sign(userInfo, "ADMIN_SECRET");
  }
  return jwt.sign(userInfo, "CLIENT_SECRET");
}

const createItem = function (itemInfo) {
  let { id, description, author, type, year, startingBid, endAt } = itemInfo;
  const item = new AuctionItem(id, description, author, type, year, startingBid, endAt);
  return { ...item };
};

const createBid = function (bidInfo) {
  let { id, itemId, bidAmount, bidBy } = bidInfo;
  const bid = new AuctionBid(id, itemId, bidAmount, bidBy);
  return { ...bid };
};
module.exports = {
  bcryptHash,
  generateUniqueId,
  getDatabase,
  writeToDatabase,
  compareHash,
  createUser,
  createAuthToken,
  createItem,
  createBid,
};
