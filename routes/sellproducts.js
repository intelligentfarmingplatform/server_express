const express = require('express')
const router = express.Router();
const UserController = require("../controllers/sellproducts");
const { protect } = require("../utils/auth");

router.use("/show" ,UserController.showproduct);
router.use(protect);
router.get("/", UserController.findAll);
router.put("/img/:id", UserController.img);
router.get("/:id", UserController.findOne);
router.delete("/img/:id", UserController.deleteimg);
router.post("/", UserController.create);

router.put("/:id", UserController.update);

router.delete("/", UserController.deleteAll);
router.delete("/:id", UserController.deleteOne);

module.exports = router;