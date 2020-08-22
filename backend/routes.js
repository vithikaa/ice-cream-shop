const router = require("express").Router();

const icecreamController = require("./controllers/icecream");
const orderController = require("./controllers/order");

router.get("/api/icecreams/options", icecreamController.icecreams_options_get);

router.get("/api/orders", orderController.orders_get);

router.get("/api/orders/:orderId", orderController.order_get);

router.post("/api/orders", orderController.order_post);

module.exports = router;
