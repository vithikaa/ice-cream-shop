const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    date: {
      type: Date,
    },
    customer: {
      name: {
        type: String,
      },
      phone: {
        type: String,
      },
      address: {
        street: {
          type: String,
        },
        locality: {
          type: String,
        },
        city: {
          type: String,
        },
        pincode: {
          type: String,
        },
      },
    },
    icecreams: [
      {
        wafer: {
          type: Schema.Types.ObjectId,
          ref: "Wafer",
        },
        flavor: {
          type: Schema.Types.ObjectId,
          ref: "Flavor",
        },
        toppings: [
          {
            type: Schema.Types.ObjectId,
            ref: "Topping",
          },
        ],
        price: {
          type: Number,
        },
      },
    ],
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

OrderSchema.virtual("grandTotal").get(function () {
  return this.icecreams.reduce((sum, icecream) => sum + icecream.price, 0);
});

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = {
  model: OrderModel,
  schema: OrderSchema,
};

/*
 * TODO:
 * 1.[x] Declare Collection by making model.
 * 2.[x] export sab kuch
 * 3. define virtual grandTotal property  --- find out about this
 * */
