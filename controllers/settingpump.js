const db = require("../models");

exports.findOne = (req, res) => {
    console.log(req.body);
    // db.tbl_settingpump.findAll({
    //     include:[db.tbl_userserial],
    //     where:{
    //         serial_id: req.body.serial
    //     }
    // })
    // .then((data) => {
    //     res.status(200).json({
    //         statusCode: 200,
    //         message: "Data in Found",
    //         data:data
    //     })
    // })
};

exports.update = (req, res ) => {
    db.tbl_settingpump.update  (
        {
        temp: req.body.temp,
        humi: req.body.humi,
        ec: req.body.ec,
        water_level: req.body.water_level,
        pump_a: req.body.pump_a,
        pump_b: req.body.pump_b,
        pump_c: req.body.pump_c,
        pump_d: req.body.pump_d
    },
    {
        where:{
            id: req.params.id,
        },
    })
    .then((data) => {
        res.status(200).json({
            
           
            data: data,
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};