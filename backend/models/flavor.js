const mongoose = require("mongoose");

const { Schema } = mongoose;

const FlavorSchema = new Schema(
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

const FlavorModel = mongoose.model("Flavor", FlavorSchema);

module.exports = {
  model: FlavorModel,
  schema: FlavorSchema,
};
