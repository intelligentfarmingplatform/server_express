const express = require("express");
const db = require("../models");

exports.findAll = (req, res) => {
    db.tbl_order.findAll()
    .then((data) => {
        res.status(200).json({
            statusCode: 200,
            message: "Data in Found",
            data: data,
        })
    })
}

exports.findOne = (req, res) => {
    db.tbl_order.findByPk(req.params.id)
    .then((data) => {
        res.status(200).json({
            statusCode: 200,
            message: "Data in Found",
            data:data
        })
    })
}

// exports.findstatus = (req, res) => {
//     const staus = req.params.id;
//     const sql =  `select * form tbl_order where ${staus}`;
//     sequelize.query(sql, async(err, res) => {
//         if(err){
//             console.log("error");
//         }else{
//             console.log(res);
//         }
//     });
// }