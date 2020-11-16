const router = require("express").Router();
const CustomerController = require("../../controllers/customers/customerController");
const OrderController = require("../../controllers/customers/orderController");
const AddressController = require("../../controllers/customers/addressController");
const { protect } = require("../../utils/auth");

router.post("/shipment", CustomerController.estimated);
router.post("/", CustomerController.create);
router.post("/login", CustomerController.login);


//required token
router.use(protect);
//address section
router.get("/address", AddressController.address);
router.post("/address", AddressController.createAddress);
router.put("/address/:id", AddressController.editAddress);
router.put("/address/set/:set/default", AddressController.setDefault);
router.delete("/address/:id", AddressController.deleteAddress);
//customer section
router.get("/edit/profile", CustomerController.editProfile);
router.get("/orders", OrderController.orderTracking);
router.post("/payment", CustomerController.payment);
router.put("/", CustomerController.updatePassword);
router.get("/me/profile", CustomerController.me);
// router.get("/", CustomerController.findAll);
// router.get("/:id", CustomerController.findOne);


//router.put("/:id", CustomerController.update);

//router.delete("/", CustomerController.deleteAll);
//router.delete("/:id", CustomerController.deleteOne);

module.exports = router;
