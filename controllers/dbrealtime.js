const db = require("../models");

exports.findAll = (req, res) => {
    db.tbl_dbRealtime.findOne({
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