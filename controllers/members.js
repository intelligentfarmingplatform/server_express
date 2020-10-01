const express = require('express');
const db = require('../models')

// Create and Save a new User

exports.findAll = (req, res) => {
    db.members.findAll()
        .then(data => {
            res.status(200).json({
                statusCode: 200,
                message: "Data found",
                data: data
            })
        })
        .catch(err => {
            res.status(500).send(err)
        })
};

exports.findOne = (req, res) =>{
    db.members.findByPk(req.params.id)
    .then((data) => {
        res.status(200).json({
            statusCode: 200,
            message: "Data in Found",
            data: data,
        });
    }).catch((err) => {
        res.status(500).send(err);
    });
};

exports.addAccount = (req,res) => {
    const { username, password, address, id_card, serial_number } = req.body
    db.members.create({
        username: req.body.username,
        password: req.body.password,
        address: req.body.address,
        id_card: req.body.id_card,
        serial_number: req.body.serial_number
    }).then(data => {
        res.status(200).json({
            statusCode: 201,
            message:"Created Successfully",
            data: data
        })
    }).catch((err) =>{
        res.status(500).send(err)
    })
}

exports.deleteone = (req,res) => {
    db.members.destroy({
        where:{
            id: req.params.id
        }
    }).then(data => {
      res.status(200).json({
          statusCode: 204,
          message: "Deleted Successfully",
          data: data
      }) ;
    })
    .catch((err) => {
        res.status(500).send(err)
    });
},
exports.update = (req,res) => {
    db.members.update (
        {
        username: req.body.username,
        password: req.body.password,
        address: req.body.address,
        id_card: req.body.id_card,
        serial_number: req.body.serial_number
        },
        {
            where:{
                id: req.params.id
            },
        })
        .then((data) => {
            res.status(200).json({
                statusCode: 201,
                message: "User Update Successfully",
                data: data
            });
        })
        .catch((err) =>{
            res.status(500).send(err);
        })
}