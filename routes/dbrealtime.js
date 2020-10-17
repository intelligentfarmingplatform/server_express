const express = require('express')
const router = express.Router();
const dbrealtimeController = require("../controllers/dbrealtime");

// router.post("/", dbrealtimeController.dbrealtime);
router.get("/:id", dbrealtimeController.findOne);
// router.get("/status/:id", dbrealtimeController.findstatus);
// router.delete("/img/:id", dbrealtime.deleteimg);
// router.post("/", dbrealtime.create);

// router.put("/:id", dbrealtime.update);

// router.delete("/", dbrealtime.deleteAll);
// router.delete("/:id", dbrealtime.deleteOne);

module.exports = router;