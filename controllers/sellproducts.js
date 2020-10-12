const express = require("express");
const fs = require("fs");
const path = require('path');
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

exports.findOne = (req, res) =>{
    db.tbl_sellproducts.findByPk(req.params.id)
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
    db.tbl_sellproducts.create({
        sell_id: req.body.sell_id,
        productname: req.body.productname,
        productprice: req.body.productnumber,
        productnumber: req.body.productdetail,
        productdetail: req.body.productdetail,
        producttab: req.body.producttab,
        productimg: 'xxx.jpg'
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
    db.tbl_sellproducts.update  (
        {
            sell_id: req.body.sell_id,
            productname: req.body.productname,
            productprice: req.body.productprice,
            productnumber: req.body.productnumber,
            productdetail: req.body.productdetail,
            producttab: req.body.producttab
    },
    {
        where:{
            id: req.params.id,
        },
    })
    .then((data) =>{
        res.status(200).json({
            statusCode: 201,
            message: "User Update Successfully",
            data : data

        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};

exports.deleteimg = async(req, res) => {
    const file = req.params.id ;
    fs.unlink(`${process.env.FILE_UPLOAD_PATH}/${file}` , async (err) => {
        if(err){
            res.status(400).json({
                statusCode: 400,
                message: "Failed to delete image files.",
                data : data
            })
        }else{
            res.status(200).json({
                statusCode: 204,
            })
        }caches(err => {
            res.status(500).send(err);
        })
    })

}

exports.img = async(req, res,) => {
    if(!req.files){
        res.status(400).json({
            statusCode: 400,
            message: "No files sent"
        })
    }
    const file = req.files.files;
    console.log(file);

    if (!file.mimetype.startsWith("image")){
        res.status(400).json({
            statusCode: 400,
            message: "Not an image file"
        })
    }

    if(file.size > process.env.MAX_FILE_UPLOAD){
        res.status(400).json({
            statusCode: 400,
            message: "File size over 20MB"
        })
    }

    file.name = `photo_${req.params.id}${
        path.parse(file.name).ext
    }`;
    console.log(file);
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
        if(err){
            res.status(400).json({
                statusCode: 400,
                message: "Copying images to the server failed."
            })
        }
        try {
           db.tbl_sellproducts.update (
               {
                productimg : file.name
               },
               {
                   where:{
                   id: req.params.id
                   } 
               }
           ).then(data => {
               res.status(200).json({
                   statusCode: 201,
                   message: 'Update Img Successfully',
                   data:data,
                   namefile : file.name
               })
           });
        }catch(err){
            res.status(400).json({
                statusCode: 400,
                message: "Failed to save the image."
            })
        }
    });
}

exports.deleteOne = (req, res) => {
    db.tbl_sellproducts.destroy({
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
    db.tbl_sellproducts.destroy({ where: {} })
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