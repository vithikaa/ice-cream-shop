const Order = require("../models/order").model;

exports.orders_get = async (req, res) => {
  Order.find({})
    .then((docs) => {
      res.send({
        success: true,
        data: docs,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        error: err,
      });
    });
};

exports.order_get = async (req, res) => {
  const { orderId } = req.params;
  Order.findOne({ _id: orderId })
    .then((doc) => {
      res.send({
        success: true,
        data: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        error: err,
      });
    });
};
