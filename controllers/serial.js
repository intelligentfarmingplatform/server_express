const express = require("express");
const db = require("../models");
const {hashPassword, matchPassword} = require("../utils/auth");


exports.addserial = async(req, res) => {
    let {name,serial} = req.body;
    let checkserialsystem = await db.tbl_Serial.findOne({
        where:{
            serial:serial
        }
    })
    if(!checkserialsystem){
        return res.status(400).json({
            statusCode:400,
            message: "ไม่มีSerialนี้ในระบบ"
        })
    }
    let checkserial = await db.tbl_userserial.findOne({
        where:{
            serial:serial
        }
    })
    if(checkserial){
        return res.status(400).json({
            statusCode:400,
            message: "Serialนี้ถูกใช้ไปแล้ว"
        })
    }
    db.tbl_userserial.create({
        name:name,
        serial:serial,
        UserId: req.user.id
    })
    .then((data ) =>{
        res.status(200).json({
            statusCode: 201,
            message: "User Created Successfully",
            data: data,
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });

}
exports.editserial = async(req, res) => {
    console.log(req.body);
    let {name,id} = req.body;

    db.tbl_userserial.update({
        name:name,
        UserId: req.user.id
    },
    {
        where:{
            id: id,
        }
    }
    )
    .then((data ) =>{
        res.status(200).json({
            statusCode: 201,
            message: "User Update Successfully",
            data: data,
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
}

exports.delserial = async(req, res) => {
    await db.tbl_userserial.destroy({
        where:{
            id: req.params.id
        }
    }).then(data => {
        res.status(200).json({
            statusCode: 204,
            message: "ลบข้อมูลSerialสำเร็จ",
            data: data,
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    })
}