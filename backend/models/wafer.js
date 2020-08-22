const mongoose = require("mongoose");

const { Schema } = mongoose;

const WaferSchema = new Schema(
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

const WaferModel = mongoose.model("Wafer", WaferSchema);

module.exports = {
  model: WaferModel,
  schema: WaferSchema,
};
