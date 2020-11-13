const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");

exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    return newPassword;
}

exports.sendTokenResponse = async (iduser, statusCode, res) => {
    const token = jwt.sign({
        iduser
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token
    });
};

exports.matchPassword = async (userInput, hashPassword) => {
    return await bcrypt.compare(userInput, hashPassword);
}


exports.protect = async (req, res, next) => {
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token) {
        return res.status(500).json({
            statusCode: 401,
            message: "Not authorize to access this route"
        });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
        db.User.findAll({
            where:{
                id: decoded.iduser,
            }
        })
        .then((data) => {
            req.user = data[0];
            req.decoded = decoded;
            // console.log(data);
            next();
        })


    // //   let userSocial = await query(
    // //     "SELECT * FROM `member_social` WHERE `uniqid` = ?",
    // //     [decoded.uniqid]
    // //   );

    // //   let userJsonSocial = Object.values(
    // //     JSON.parse(JSON.stringify(userSocial))
    // //   )[0];

    // //   if (userJsonSocial != undefined) {
    // //     req.user = userJsonSocial;
    // //     next();
    // //   }
    } catch (error) {
        return res.status(500).json({
            statusCode: 401,
            message: "Not authorize to access this route"
        });
    }
};