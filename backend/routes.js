const router = require("express").Router();

const icecreamController = require('./controllers/icecream')
const orderController = require('./controllers/order')

router.get("/api/icecreams/options", icecreamController.icecreams_options_get);

router.get("/api/orders", () => {});

router.get("/api/orders/:orderId", () => {});

router.post("/api/orders", () => {});

module.exports = router;
