const Flavor = require("../models/flavor").model;
const Topping = require("../models/topping").model;
const Wafer = require("../models/wafer").model;

exports.icecreams_options_get = async (req, res) => {
  const flavors = await Flavor.find({}).lean();
  const toppings = await Topping.find({}).lean();
  const wafers = await Wafer.find({}).lean();

  const icecreamOptions = {
    flavors,
    toppings,
    wafers,
  };

  res.send({
    success: true,
    data: icecreamOptions,
  });
};
