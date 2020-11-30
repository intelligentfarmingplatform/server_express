const db = require("../../models");

exports.orderTracking = async (req, res) => {
  try {
    let listOrder = await db.CustomerOrder.findAll({
      include: [ db.CustomerOrderItem,db.CustomerDelivery,db.CustomerTransaction],
      where: { CustomerId: req.decoded.iduser },
    });
    if (listOrder.length == 0) {
      return res.status(204).json({
        success: false,
        message: "ยังไม่มีการสั่งซื้อ",
      });
    }
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
