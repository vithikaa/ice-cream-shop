const mongoose = require("mongoose");

const { Schema } = mongoose;

const ToppingSchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    available: {
      type: Boolean,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObjects: {
      virtuals: true,
    },
  }
);

const ToppingModel = mongoose.model("Topping", ToppingSchema);

module.exports = {
  model: ToppingModel,
  schema: ToppingSchema,
};
