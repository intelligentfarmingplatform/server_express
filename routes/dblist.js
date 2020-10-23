const express = require('express')
const router = express.Router();
const dblistController = require("../controllers/dblist");

// router.post("/", dblistController.dblist);
router.get("/:id", dblistController.findOne);
// router.get("/status/:id", dblistController.findstatus);
// router.delete("/img/:id", dblist.deleteimg);
// router.post("/", dblist.create);

// router.put("/:id", dblist.update);

// router.delete("/", dblist.deleteAll);
// router.delete("/:id", dblist.deleteOne);

module.exports = router;