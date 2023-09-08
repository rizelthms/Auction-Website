const express = require("express");
const expressLogging = require("express-logging");
const logger = require("logops");
const cors = require("cors");
const auctionbid = require("./routes/auctionbid");
const auctionitem = require("./routes/auctionitem");
const auctionsearch = require("./routes/auctionsearch");
const auth = require("./routes/auth");
var bodyParser = require("body-parser");

const DatabaseAPI = require("./databaseapi");

const app = express();

const port = 3000;

// app.use(expressLogging(logger));
// app.use(express.json()); // Automatically parse request bodies as JSON
// app.use(express.urlencoded());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/auctionbid", auctionbid);
app.use("/auctionitem", auctionitem);
app.use("/auctionsearch", auctionsearch);
app.use("/auth", auth);

DatabaseAPI.init();

app.get("/", (req, res) => {
  // res.send('Hello World!')
  res.json({ msg: "hello world" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
