const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    return newPassword;
}

exports.sendTokenResponse = async(iduser, statusCode, res) => {
    const token = jwt.sign({ iduser }, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE })
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
         ),
        httpOnly:true,
    };

    res.status(statusCode).cookie("token", token, options).json({ success: true, token });
};

exports.matchPassword = async(userInput , hashPassword) => {
    return await bcrypt.compare(userInput , hashPassword);
}
