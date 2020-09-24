const express = require('express')
const router = express.Router();
const UserController = require("../controllers/user");

router.get("/", UserController.findAll);
router.get("/:id", UserController.findOne);

router.post("/", UserController.create);

router.put("/:id", UserController.update);

router.delete("/", UserController.deleteAll);
router.delete("/:id", UserController.deleteOne);

module.exports = router;