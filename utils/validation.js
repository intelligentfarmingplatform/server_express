//Validation
const Joi = require("joi");
//Customer Register Validation
const customerRegisterValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(6).required().messages({
      "string.empty": `Username ไม่สามารถเป็นค่าว่างได้`,
      "string.min": `Username ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
      "any.required": `จำเป็นต้องใส่ Username`,
    }),
    email: Joi.string().min(6).required().email().messages({
      "string.email": `รูปแบบ E-mail ไม่ถูกต้อง`,
      "string.empty": `E-mail ไม่สามารถเป็นค่าว่างได้`,
      "string.min": `E-mail ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
      "any.required": `จำเป็นต้องใส่ E-mail`,
    }),
    password: Joi.string().min(8).required().messages({
      "string.empty": `รหัสผ่านไม่สามารถเป็นค่าว่างได้`,
      "string.min": `รหัสผ่านต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
      "any.required": `จำเป็นต้องใส่รหัสผ่าน`,
    }),
  });
  return schema.validate(data);
};

//Customer Login Validation
const customerLoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email().messages({
      "string.email": `รูปแบบ E-mail ไม่ถูกต้อง`,
      "string.empty": `E-mail ไม่สามารถเป็นค่าว่างได้`,
      "string.min": `E-mail ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
      "any.required": `จำเป็นต้องใส่ E-mail`,
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": `รหัสผ่านไม่สามารถเป็นค่าว่างได้`,
      "string.min": `รหัสผ่านต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
      "any.required": `จำเป็นต้องใส่รหัสผ่าน`,
    }),
  });
  return schema.validate(data);
};

//backend  Register Validation //
const RegisterValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(6)
      .regex(/^[a-z0-9]+$/)
      .required()
      .messages({
        "string.pattern.base": `Username จะต้องเป็นภาษาอังกฤษและตัวเลขเท่านั้น`,
        "string.empty": `Username ไม่สามารถเป็นค่าว่างได้`,
        "string.min": `Username ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
        "any.required": `จำเป็นต้องใส่ Username`,
      }),
    password: Joi.string()
      .min(8)
      .regex(/^[_@/ a-z0-9]+$/)
      .required()
      .messages({
        "string.pattern.base": `รหัสผ่านจะต้องเป็นภาษาอังกฤษและตัวเลขหรือตัวอักษรพิเศษเท่านั้น`,
        "string.empty": `รหัสผ่านไม่สามารถเป็นค่าว่างได้`,
        "string.min": `รหัสผ่านต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
        "any.required": `จำเป็นต้องใส่รหัสผ่าน`,
      }),
    serial: Joi.string()
      .min(6)
      .regex(/^[_ a-z0-9]+$/)
      .required()
      .messages({
        "string.pattern.base": `รูปแบบ Serial ไม่ถูกต้อง`,
        "string.empty": `Serial ไม่สามารถเป็นค่าว่างได้`,
        "string.min": `Serial ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
        "any.required": `จำเป็นต้องใส่ Serial`,
      }),
  });
  return schema.validate(data);
};

//backend Login Validation
const LoginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(6)
      .regex(/^[a-z0-9]+$/)
      .required()
      .messages({
        "string.pattern.base": `Username จะต้องเป็นภาษาอังกฤษและตัวเลขเท่านั้น`,
        "string.empty": `Username ไม่สามารถเป็นค่าว่างได้`,
        "string.min": `Username ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
        "any.required": `จำเป็นต้องใส่ Username`,
      }),
    password: Joi.string()
      .min(8)
      .regex(/^[_@/ a-z0-9]+$/)
      .required()
      .messages({
        "string.pattern.base": `รหัสผ่านจะต้องเป็นภาษาอังกฤษและตัวเลขหรือตัวอักษรพิเศษเท่านั้น`,
        "string.empty": `รหัสผ่านไม่สามารถเป็นค่าว่างได้`,
        "string.min": `รหัสผ่านต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
        "any.required": `จำเป็นต้องใส่รหัสผ่าน`,
      }),
  });
  return schema.validate(data);
};
module.exports.customerRegisterValidation = customerRegisterValidation;
module.exports.customerLoginValidation = customerLoginValidation;
module.exports.RegisterValidation = RegisterValidation;
module.exports.LoginValidation = LoginValidation;
