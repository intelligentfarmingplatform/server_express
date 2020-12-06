const db = require("../models");

exports.findAll = (req, res) => {
    let{ serial } = req.body
    db.tbl_dbRealtime.findOne({
        where:{
            serial_number : serial
        }
    })
    .then((data) => {
        res.status(200).json({
            statusCode: 200,
            data: data,
        });
    }).catch((err) => {
        res.status(500).send(err);
    })
}