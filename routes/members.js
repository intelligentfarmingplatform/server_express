const express = require('express')
const router = express.Router();
const membersController = require("../controllers/members");

router.get("/", membersController.findAll);
router.get("/:id", membersController.findOne);

router.post("/", membersController.create);

router.put("/:id", membersController.update);

router.delete("/:id", membersController.deleteOne);

module.exports = router;