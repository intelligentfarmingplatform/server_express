const db = require("../models");

exports.orderTracking = async (req, res) => {
    try {
      let listOrder = await db.CustomerOrderItem.findAll({
        where: {
          customerid: req.decoded.iduser,
        },
      });
      res.json({
        success: true,
        order: listOrder,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };