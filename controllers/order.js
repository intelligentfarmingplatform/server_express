const express = require("express");
const db = require("../models");

exports.findAll = (req, res) => {
    db.tbl_order.findAll({
        where:{
            serial_number : req.user.Serial
        }
    })
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

exports.changestatus = (req, res) => {
    db.tbl_order.update (
        {
            status_order: "Delivery"
        },
        {
            where:{
                id: req.params.id
            }
        })
        .then((data) => {
            res.status(200).json({
                statusCode: 201,
                message: "Status Update Successfully",
                data: data
            })
        }).catch((err) => {
            res.status(500).send(err);
        })
}

exports.ShowOrder = async (req, res) => {
    // console.log(req.user);
    try {
      let listOrder = await db.CustomerOrderItem.findAll({
        where:{
            cartItem : [{nameseller : "thitiphong"}]
        }
      });
      if (listOrder.length == 0) {
        return res.status(204).json({
          success: false,
          message: "ยังไม่มีการสั่งซื้อ",
        });
      }
      res.json({
        success: true,
        order: listOrder,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

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