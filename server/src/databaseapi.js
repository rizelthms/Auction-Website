let _ = require("lodash");
const fs = require("fs");
// let database = require("./database");
const User = require("./models/user");
const { bcryptHash, generateUniqueId, getDatabase } = require("./utils");
let database;
(async () => {
  database = await getDatabase();
})();

const DUMMY_ADMIN = new User(
    generateUniqueId(),
    "admin",
    bcryptHash("admin123"),
    true
);
const DUMMY_USER = new User(
    generateUniqueId(),
    "user",
    bcryptHash("user123"),
    false
);

/* Perform initial setup of the DB. Only runs once on start-up. */
async function init() {
  // if (database.length) {
  //   throw "Database cannot be initialized because it already contains data.";
  // }

  const db = await getDatabase();
  if (!Object.keys(db).length) {
    saveObject({ admin: [{ ...DUMMY_ADMIN }] });
    saveObject({ user: [{ ...DUMMY_USER }] });
    saveToJSON(database);
  }

  // Add a dummy admin and user account.
}

/* Save an object to the DB. */
function saveObject(obj) {
  database = {
    ...database,
    ...obj,
  };

}

/* Find the first object in the DB that matches the given query. */
function findObject(objectClass, query) {
  for (let obj of database) {
    if (obj instanceof objectClass && isSubset(query, obj)) return obj;
  }
}

function getItemById(auctionId) {
  let allAuctions = getAllItems();
  let auctionDetails = allAuctions.find((e) => e.id === auctionId);
  return auctionDetails;
}

function getBidById(bidId) {
  let allBids = getAllBids();
  let bidDetails = allBids.find((e) => e.id === bidId);
  return bidDetails;
}

/** Get All bids for an item */
function getBidsForItem(itemId) {
  let allBids = getAllBids();
  let bidsForItem = allBids.filter((e) => e.itemId === itemId);
  return bidsForItem;
}

/* Search for all objects of a given class in the database, returning a list of objects
 * of that class if they have a subset of fields matching 'query'. */
function searchObjects(objectClass, query) {
  let matches = [];
  for (let obj of database) {
    if (obj instanceof objectClass && isSubset(query, obj)) matches.push(obj);
  }
  return matches;
}

/* Check if the fields in a given object form a subset of another object. */
function isSubset(set, superset) {
  return _.isMatch(superset, set);
}

/* Add data to json file */
async function saveToJSON(j_son) {
  // let database = await getDatabase();
  fs.writeFile(
      "./database.json",
      JSON.stringify(j_son),
      { flag: "w" },
      (err, data) => {
        if (!err) {
          console.log("saved the json");
        }
      }
  );
}

function getAllAdmins() {
  return database.admin;
}

function getAllUsers() {
  return database.user;
}

function getAllItems() {
  return database.item;
}

function getAllBids() {
  return database.bids;
}

function getAdminByName(name) {
  let adminData = database.admin.find((e) => e.name === name);
  return adminData;
}

function getUserByName(name) {
  let userData = getAllUsers().find((e) => e.name === name);
  return userData;
}

function getAnyUserByName(name, isAdmin) {
  if (isAdmin) {
    return getAdminByName(name);
  }
  return getUserByName(name);
}

function addANewUser(user) {
  let allUsers = getAllUsers() ?? [];
  allUsers.push(user);
  saveObject({ user: allUsers });
  saveToJSON(database);
  return database;
}

function addANewItem(item) {
  let allItems = getAllItems() ?? [];
  allItems.push(item);
  saveObject({ item: allItems });
  saveToJSON(database);
  return database;
}

function addANewBid(bid) {
  let allBids = getAllBids() ?? [];
  allBids.push(bid);
  saveObject({ bids: allBids });
  saveToJSON(database);
  return database;
}

function deleteMyBid(bidId) {
  let allBids = getAllBids();
  let bidIndex = allBids.findIndex((e) => e.id === bidId);
  allBids.splice(bidIndex, 1);
  saveObject({ bids: allBids });
  saveToJSON(database);
  return allBids;
}

function deleteItem(itemId) {
  let allItems = getAllItems();
  let itemIndex = allItems.findIndex((e) => e.id === itemId);
  allItems.splice(itemIndex, 1);

  saveObject({ item: allItems });
  saveToJSON(database);
  return allItems;
}

function getHighestBidForItem(itemId) {
  let allBids = getBidsForItem(itemId);
  if (allBids.length === 0) {
    return null;
  }
  let highestBid;
  if (allBids.length === 1) {
    highestBid = allBids[0];
  } else {
    highestBid = allBids.reduce((a, b) => (a.bidAmount > b.bidAmount ? a : b));
  }
  return highestBid;
}

async function updateItem(itemId, bidAmount) {
  let updatedItems = getAllItems();
  let itemIndex = updatedItems.findIndex((e) => e.id === itemId);

  updatedItems[itemIndex]["currentBid"] = bidAmount;
  await getDatabase();
  saveObject({ item: updatedItems });
  saveToJSON(database);
}

async function deleteBidsByItemId(itemId) {
  try {
    let allBids = getAllBids() ?? [];
    if (!allBids.length) {
      throw "No bids";
    }
    allBids = allBids.filter((e) => e.itemId !== itemId);
    saveObject({ bids: allBids });
    saveToJSON(database);
    return [];
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  init,
  saveObject,
  findObject,
  searchObjects,
  getAllAdmins,
  getAdminByName,
  getAllUsers,
  getUserByName,
  getAnyUserByName,
  addANewUser,
  getAllItems,
  addANewItem,
  getItemById,
  getAllBids,
  addANewBid,
  getBidById,
  getBidsForItem,
  deleteMyBid,
  saveToJSON,
  getHighestBidForItem,
  updateItem,
  deleteItem,
  deleteBidsByItemId,
};
