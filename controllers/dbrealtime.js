const db = require("../models");

exports.findOne = (req, res) => {
    db.tbl_dbRealtime.findByPk(req.params.id)
    .then((data) => {
        res.status(200).json({
            statusCode: 200,
            message: "Data in Found",
            data:data
        })
    })
}