const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const logger = require("morgan");

require("dotenv").config();

const { MONGODB_URI, PORT } = process.env;
// const PUBLIC_DIR = path.join(__dirname, process.env.PUBLIC_DIR)

const app = express();

// db setup
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// other setup
app.use(cors());

if (process.env.NODE_ENV == "development") app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router setup

app.use("/", require("./routes"));

// app.use(express.static(PUBLIC_DIR))

app.get("*", function (req, res) {
  res.sendFile(PUBLIC_DIR + "/index.html");
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.info("Listening on port " + PORT + "...");
});
