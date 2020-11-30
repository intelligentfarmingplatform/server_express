const db = require("../models");
const {
  hashPassword,
  sendTokenResponse,
  matchPassword,
} = require("../utils/auth");
const { RegisterValidation, LoginValidation } = require("../utils/validation");

exports.login = async (req, res) => {
  let { username, password } = req.body;
  const { error } = LoginValidation({ username, password });
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  //เช็คว่ามี user รึเปล่า
  const userExist = await db.User.findOne({
    where: { userName: username }, 
  });
  if (!userExist)
    return res
      .status(400)
      .json({ success: false, message: "ไม่มี User นี้อยู่ในระบบ" });
  //เช็ครหัสผ่านว่าถูกมั้ย ??
  const validPass = await matchPassword(password, userExist.password);
  if (!validPass || !password)
    return res
      .status(400)
      .json({ success: false, message: "รหัสผ่านไม่ถูกต้อง" });

  await sendTokenResponse(userExist.id, 200, res);
};

exports.sing = async (req, res) => {
  let { username, password, serial } = req.body;
  const { error } = RegisterValidation({ username, password, serial });
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  const usernameExist = await db.User.findOne({
    where: { userName: username },
  });
  if (usernameExist)
    return res
      .status(400)
      .json({ success: false, message: "Username นี้มีผู้ใช้อยู่แล้ว" });
  const serialExist = await db.tbl_Serial.findOne({
    where: { serial: serial }
  });

  if (!serialExist) {
    return res
      .status(400)
      .json({ success: false, message: "ไม่มี Serial นี้ในระบบ" });
  }
  const serialCheck = await db.tbl_userserial.findOne({
    where: { Serial: serialExist.serial },
  });
  if (serialCheck) {
    return res
      .status(400)
      .json({ success: false, message: "Serial นี้ได้ถูกลงทะเบียนแล้ว" });
  }
  //หากไม่ติดเงื่อนไขใด ๆ จะทำการสมัครสมาชิกโดยใช้ serial ที่ใส่เข้ามา
  try {
    password = await hashPassword(password);
    const CreateUser = await db.User.create({
      userName: username,
      password: password,
    });
    const CreateDetailUser = await db.tbl_userdetail.create({
      name: '',
      email:'',
      address:'',
      detail:'',
      img:'Default.png',
      status_level:'members',
      UserId: CreateUser.id
    });
    const AddSerialUser = await db.tbl_userserial.create({
      name:'',
      serial: serial,
      UserId: CreateUser.id
    })
    await sendTokenResponse(CreateUser.id, 200, res);
    //return res.json({ success: true, message: "สมัครสมาชิกสำเร็จ" });
  } catch (err) {
    res.status(500).send(err);
  }
};
