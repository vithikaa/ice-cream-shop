const Order = require('../models/order').model
const Wafer = require('../models/wafer').model
const Flavor = require('../models/flavor').model
const Topping = require('../models/topping').model

exports.orders_get = async (req, res) => {
  Order.find({})
    .then((docs) => {
      res.send({
        success: true,
        data: docs,
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        success: false,
        error: err,
      })
    })
}

exports.order_get = async (req, res) => {
  const { orderId } = req.params
  Order.findOne({ _id: orderId })
    .populate('icecreams.wafer')
    .populate('icecreams.flavor')
    .populate('icecreams.toppings')
    .then((doc) => {
      res.send({
        success: true,
        data: doc,
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        success: false,
        error: err,
      })
    })
}

exports.order_post = async (req, res) => {
  const { customer, icecreams } = req.body

  // calculate price
  await Promise.all(
    icecreams.map(async (icecream) => {
      console.log(icecream)
      let flavor = (
        await Flavor.findOne({ _id: icecream.flavor }).select('price').lean()
      ).price

      let wafer = (
        await Wafer.findOne({ _id: icecream.wafer }).select('price').lean()
      ).price

      let toppings = (
        await Topping.find({
          _id: {
            $in: [icecream.toppings],
          },
        })
          .select('price')
          .lean()
      ).reduce((s, a) => s + a.price, 0)

      icecream.price = flavor + wafer + toppings
    })
  ).catch((err) => console.error)

  console.log({ icecreams })

  const newOrder = new Order({
    customer,
    icecreams,
    date: new Date(),
  })

  newOrder
    .save()
    .then((docs) => {
      res.send({ success: true, data: docs })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        success: false,
        error: err,
      })
    })
}
