const db = require("../models");
const {
  hashPassword,
  sendTokenResponse,
  matchPassword,
} = require("../utils/auth");
const {
  customerRegisterValidation,
  customerLoginValidation,
} = require("../utils/validation");
const moment = require("moment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.findAll = (req, res) => {
  db.Customer.findAll()
    .then((data) => {
      res.status(200).json({
        statusCode: 200,
        message: "Data in Found",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
exports.findOne = (req, res) => {
  db.Customer.findByPk(req.params.id)
    .then((data) => {
      res.status(200).json({
        statusCode: 200,
        message: "Data in Found",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.orderTracking = async (req, res) => {
  try {
    let listOrder = await db.CustomerOrderItem.findOrder({
      where: {
        customerId: req.decoded.iduser,
      },
    });
    res.json({
      success: true,
      data: listOrder,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { error } = customerLoginValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  const emailExist = await db.Customer.findOne({
    where: { email: req.body.email },
  });
  if (!emailExist)
    return res
      .status(400)
      .json({ success: false, message: "ไม่มี Email นี้อยู่ในระบบ" });
  //password is correct ??
  const validPass = await matchPassword(req.body.password, emailExist.password);
  if (!validPass || !req.body.password)
    return res
      .status(400)
      .json({ success: false, message: "รหัสผ่านไม่ถูกต้อง" });

  sendTokenResponse(emailExist.id, 200, res);
};

exports.me = async (req, res) => {
  try {
    let foundUser = await db.Customer.findOne({
      where: { id: req.decoded.iduser },
    });
    //console.log("found", foundUser);
    if (foundUser) {
      res.json({
        success: true,
        users: foundUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.create = async (req, res) => {
  const { error } = customerRegisterValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  const usernameExist = await db.Customer.findOne({
    where: { userName: req.body.userName },
  });
  if (usernameExist)
    return res
      .status(400)
      .json({ success: false, message: "Username นี้มีผู้ใช้อยู่แล้ว" });
  console.log(usernameExist);
  const emailExist = await db.Customer.findOne({
    where: { email: req.body.email },
  });
  if (emailExist)
    return res
      .status(400)
      .json({ success: false, message: "Email นี้มีผู้ใช้อยู่แล้ว" });
  try {
    let password = req.body.password;
    password = await hashPassword(password);

    db.Customer.create({
      userName: req.body.userName,
      password: password,
      email: req.body.email,
      status_level: "member",
    });
    return res.json({ success: true, message: "Register Successfully !" });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.update = (req, res) => {
  db.Customer.update(
    {
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      status_level: req.body.status,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      res.status(200).json({
        statusCode: 201,
        message: "User Update Successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.deleteOne = (req, res) => {
  db.Customer.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.status(200).json({
        statusCode: 204,
        message: "User Deleted Successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.deleteAll = (req, res) => {
  db.Customer.destroy({ where: {} })
    .then((data) => {
      res.status(200).json({
        statusCode: 204,
        message: "User Deleted All Successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.estimated = async (req, res) => {
  const SHIPMENT = {
    normal: {
      price: 25,
      days: 5,
    },
    express: {
      price: 40,
      days: 3,
    },
  };
  function shipmentPrice(shipmentOption) {
    let estimated = moment()
      .add(shipmentOption.days, "d")
      .format("dddd MMMM Do");
    return { estimated, price: shipmentOption.price };
  }
  let shipment;
  if (req.body.shipment === "normal") {
    shipment = shipmentPrice(SHIPMENT.normal);
  } else {
    shipment = shipmentPrice(SHIPMENT.express);
  }

  res.json({
    success: true,
    shipment: shipment,
  });
};

exports.payment = (req, res) => {
  let totalPrice = Math.round(req.body.totalPrice * 100);
  stripe.customers
    .create({
      email: req.decoded.email,
    })
    .then((customer) => {
      return stripe.customers.createSource(customer.id, {
        source: "tok_visa",
      });
    })
    .then((source) => {
      return stripe.charges.create({
        amount: totalPrice,
        currency: "thb",
        customer: source.customer,
      });
    })
    .then(async (charge) => {
      let cart = req.body.cart;
      cart.map((product) => {
        quantity = parseInt(product.quantity);
      });
      let order = db.CustomerOrderItem.create({
        cartItem: cart,
        quantity: quantity,
        totalPrice: req.body.totalPrice,
        customerId: req.decoded.iduser,
        estimatedDelivery: req.body.estimatedDelivery,
        orderStatus: "Order",
      });

      order.owner = req.decoded.iduser;
      order.estimatedDelivery = req.body.estimatedDelivery;

      // await order.save();

      res.json({
        success: true,
        message: "Successfully made a payment",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};
