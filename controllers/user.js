const express = require("express");
const db = require("../models");
const {hashPassword} = require("../utils/auth");

exports.findAll = (req, res) => {
    db.User.findAll()
    .then((data) => {
        res.status(200).json({
            statusCode: 200,
            message: "Data in Found",
            data: data,
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};
exports.userone = async (req, res) =>{
        await db.User.scope("withoutPassword").findOne({
            include: [db.tbl_userdetail,db.tbl_userserial],
            where: {id: req.user.id },
        })
        .then((data) => {
            res.status(200).json({
                statusCode: 200,
                data: data
            })
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

exports.create = async(req, res) =>{
    let password = req.body.password
    password = await hashPassword(password);

    db.User.create({
        userName: req.body.userName,
        password: password,
        email: req.body.email,
        status_level: req.body.status,
        Serial: req.body.serial
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
};

exports.update = (req, res ) => {
    db.User.update  (
        {
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        status_level: req.body.status
    },
    {
        where:{
            id: req.params.id,
        },
    })
    .then((data) => {
        res.status(200).json({
            statusCode: 201,
            message: "User Update Successfully",
            data: data,
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};

exports.deleteOne = (req, res) => {
    db.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.status(200).json({
            statusCode: 204,
            message: "User Deleted Successfully",
            data: data,
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};

exports.deleteAll = (req, res) => {
    db.User.destroy({ where: {} })
    .then((data) => {
        res.status(200).json({
            statusCode: 204,
            message: "User Deleted All Successfully",
            data: data,
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};