const express = require("express");
const db = require("../models");

exports.findAll = (req, res) => {
    db.tbl_sellproducts.findAll()
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

exports.deleteOne = (req, res) => {
    db.sellproducts.destroy({
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
    db.sellproducts.destroy({ where: {} })
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