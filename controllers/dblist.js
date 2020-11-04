const db = require("../models");

exports.findAll = (req, res) => {
    db.tbl_dbList.findAll({
        where:{
            serial_number: req.user.Serial
        }
    })
    .then((data) => {
        console.log(data);
        res.status(200).json({
            statusCode: 200,
            message: "Data in Found",
            data:data

        })
    })
    .catch((err) => {
        res.status(500).send(err);
    })
}