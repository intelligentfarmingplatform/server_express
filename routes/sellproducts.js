const express = require('express')
const router = express.Router();
const UserController = require("../controllers/sellproducts");

router.get("/", UserController.findAll);
router.put("/img/:id", UserController.img);
router.get("/:id", UserController.findOne);
router.delete("/img/:id", UserController.deleteimg);
router.post("/", UserController.create);

router.put("/:id", UserController.update);

router.delete("/", UserController.deleteAll);
router.delete("/:id", UserController.deleteOne);

module.exports = router;