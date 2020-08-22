const mongoose = require("mongoose");
require("dotenv").config();

const Flavor = require("../models/flavor").model;
const Wafer = require("../models/wafer").model;
const Topping = require("../models/topping").model;

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

let wafers = [
  {
    name: "Plain",
    price: 25,
    image: "/some-sexy-image/that-we-will-add.png",
    available: true,
  },
];

let toppings = [
  {
    name: "Tutti Fruti",
    price: 15,
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

// async function insertWafers() {
//   for (let wafer of wafers) {
//     const newWafer = new Wafer(wafer);

//     await newWafer.save().catch(console.error);
//   }
//   mongoose.connection.close();
// }
// insertWafers();

// async function insertToppings() {
//   for (let topping of toppings) {
//     const newTopping = new Topping(topping);

//     await newTopping.save().catch(console.error);
//   }
//   mongoose.connection.close();
// }
// insertToppings();
