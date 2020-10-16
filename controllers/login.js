const db = require("../models");

exports.login = async(req, res ) => {
    const { username, password } = req.body;

    if(!username || !password){
        console.log("no user in database");
    }

    db.User.findAll({
        where:{
            userName: username,
            password : password
        }
    })
    .then((data) => {
        res.status(200).json({
            statusCode: 200,
            message: "login Success",
            data:data
        })
    })
}