const express = require("express");
const db = require("../models");

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
exports.findOne = (req, res) =>{
    db.User.findByPk(req.params.id)
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

exports.create = (req, res) =>{
    db.User.create({
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
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