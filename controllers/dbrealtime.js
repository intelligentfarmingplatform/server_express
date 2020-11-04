const db = require("../models");

exports.findAll = (req, res) => {
    console.log(req.user);
    db.tbl_dbRealtime.findAll({
        where:{
            serial_number : req.user.Serial
        }
    })
    .then((data) => {
        res.status(200).json({
            statusCode: 200,
            data: data,
        });
    })
}