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
    image: "/flavor_vanilla.png",
    available: true,
  },
  {
    name: "Strawberry",
    price: 20,
    image: "/flavor_strawberry.png",
    available: true,
  },
  {
    name: "Mango",
    price: 25,
    image: "/flavor_mango.png",
    available: true,
  },
  {
    name: "Coconut",
    price: 25,
    image: "/flavor_coconut.png",
    available: true,
  },
  {
    name: "Chocolate",
    price: 30,
    image: "/flavor_chocolate.png",
    available: true,
  },
];

let wafers = [
  {
    name: "Plain",
    price: 20,
    image: "/wafer_plain.png",
    available: true,
  },
  {
    name: "Waffle",
    price: 25,
    image: "/wafer_waffle.png",
    available: true,
  },
  {
    name: "Chocolate",
    price: 30,
    image: "/wafer_choco.png",
    available: true,
  },
];

let toppings = [
  {
    name: "Tutti Fruti",
    price: 15,
    image: "/topping_tutti.png",
    available: true,
  },
  {
    name: "Roasted Badam",
    price: 15,
    image: "/topping_badam.png",
    available: true,
  },
  {
    name: "Choco chips",
    price: 15,
    image: "/topping_choco.png",
    available: true,
  },
];

async function insertData() {
  for (let flavor of flavors) {
    const newFlavor = new Flavor(flavor);
    await newFlavor.save().catch(console.error);
  }
  for (let wafer of wafers) {
    const newWafer = new Wafer(wafer);
    await newWafer.save().catch(console.error);
  }
  for (let topping of toppings) {
    const newTopping = new Topping(topping);
    await newTopping.save().catch(console.error);
  }
  mongoose.connection.close();
}

insertData();
