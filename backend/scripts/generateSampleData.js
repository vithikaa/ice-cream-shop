const mongoose = require("mongoose");
require("dotenv").config();

const Flavor = require("../models/flavor").model;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let flavors = [
  {
    name: "Vanilla",
    price: 20,
    image: "/some-sexy-image/that-we-will-add.png",
    available: true,
  },
];

async function insertFlavors() {
  for (let flavor of flavors) {
    const newFlavor = new Flavor(flavor);

    await newFlavor.save().catch(console.error);
  }
  mongoose.connection.close();
}

insertFlavors();
