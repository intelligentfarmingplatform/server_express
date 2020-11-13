const router = require("express").Router();
const CustomerController = require("../controllers/customerController");
const OrderController = require("../controllers/orderController");
const { protect } = require("../utils/auth");

router.get("/shipment",CustomerController.estimated);
router.post("/", CustomerController.create);
router.post("/login", CustomerController.login);

//required token
router.use(protect);
router.get("/orders", OrderController.orderTracking);
router.post("/payment", CustomerController.payment);
router.get("/", CustomerController.findAll);
router.get("/:id", CustomerController.findOne);
router.get("/me/profile",CustomerController.me);



router.put("/:id", CustomerController.update);

router.delete("/", CustomerController.deleteAll);
router.delete("/:id", CustomerController.deleteOne);


module.exports = router;