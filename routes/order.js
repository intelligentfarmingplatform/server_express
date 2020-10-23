const express = require('express')
const router = express.Router();
const OrderController = require("../controllers/order");

router.get("/", OrderController.findAll);
router.get("/:id", OrderController.findOne);
router.put("/:id", OrderController.changestatus);
// router.get("/status/:id", OrderController.findstatus);
// router.delete("/img/:id", Order.deleteimg);
// router.post("/", Order.create);

// router.put("/:id", Order.update);

// router.delete("/", Order.deleteAll);
// router.delete("/:id", Order.deleteOne);

module.exports = router;