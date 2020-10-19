const db = require("../models");

exports.findOne = (req, res) => {
    db.tbl_settingpump.findByPk(req.params.id)
    .then((data) => {
        res.status(200).json({
            statusCode: 200,
            message: "Data in Found",
            data:data
        })
    })
};

exports.update = (req, res ) => {
    db.tbl_settingpump.update  (
        {
        temp: req.body.temp,
        humi: req.body.humi,
        ec: req.body.ec,
        water_level: req.body.water_level,
        pump_a: req.body.pumpa,
        pump_b: req.body.pumpb,
        pump_c: req.body.pumpc,
        pump_d: req.body.pumpd
    },
    {
        where:{
            id: req.params.id,
        },
    })
    .then((data) => {
        res.status(200).json({
            statusCode: 201,
            message: "Update Successfully",
            data: data,
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};