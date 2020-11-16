const db = require("../../models");
const {
  hashPassword,
  sendTokenResponse,
  matchPassword,
} = require("../../utils/auth");
const {
  customerRegisterValidation,
  customerLoginValidation,
  customerChangePasswordValidation,
  customerProfileValidation,
} = require("../../utils/validation");
const moment = require("moment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
    let foundUser = await db.Customer.scope("withoutPassword").findOne({
      include: [db.CustomerProfile, db.CustomerOrderItem],
      where: { id: req.decoded.iduser },
    });
    //console.log("found", foundUser);
    if (foundUser) {
      let findProfile = await db.CustomerProfile.findOne({
        where: {
          CustomerId: req.decoded.iduser,
        },
      });
      if (!findProfile) {
        let createNewProfile = await db.CustomerProfile.create({
          displayName: foundUser.userName,
          fullName: null,
          phoneNumber: null,
          sex: null,
          CustomerId: req.decoded.iduser,
        });
        console.log("from create new profile", createNewProfile);
        if (createNewProfile) {
          let putProfileId = await db.Customer.update(
            {
              profileId: createNewProfile.id,
            },
            {
              where: { id: req.decoded.iduser },
            }
          );
        }
      }

      res.json({
        success: true,
        message: "Successfully login",
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

exports.editProfile = async (req, res) => {
  const { error } = customerProfileValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    let foundUser = await db.Customer.findOne({
      where: {
        id: req.decoded.iduser,
      },
    });
    if (foundUser) {
      let foundProfile = await db.CustomerProfile.findOne({
        where: { id: foundUser.profileId },
      });
      if (foundProfile) {
        await db.CustomerProfile.update(
          {
            displayName: req.body.displayName,
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            sex: req.body.sex,
            CustomerId: req.decoded.iduser,
          },
          {
            where: {
              id: foundUser.profileId,
            },
          }
        );
      }
    }

    return res.json({
      success: true,
      message: "แก้ไขโปรไฟล์สำเร็จ",
    });
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

    const CreatedCustomer = await db.Customer.create({
      userName: req.body.userName,
      password: password,
      email: req.body.email,
      status_level: "member",
    });
    return res.json({ success: true, message: "Register Successfully !" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  const { error } = customerChangePasswordValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    let password = req.body.password;
    password = await hashPassword(password);
    const UpdateUser = await db.Customer.update(
      {
        password: password,
      },
      {
        where: {
          id: req.decoded.iduser,
        },
      }
    );
    if (UpdateUser) {
      res.json({
        success: true,
        message: "อัพเดทรหัสผ่านใหม่เรียบร้อยแล้ว",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
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
        CustomerId: req.decoded.iduser,
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
