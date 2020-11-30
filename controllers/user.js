const express = require("express");
const db = require("../models");
const {hashPassword, matchPassword} = require("../utils/auth");

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
            include: [db.tbl_userdetail,db.tbl_userserial,db.tbl_useraccountbank],
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
    let {name,email,address,detail,id} = req.body;
    db.tbl_userdetail.update(
        {
        name: name,
        email: email,
        address: address,
        detail: detail,
    },
    {
        where:{
            id: id,
        },
    })
    .then((data) => {
        res.status(200).json({
            statusCode: 201,
            message: "User Update Successfully",
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};

exports.changepassword = async(req, res) => {
    let {password, newpassword,confirmpassword} = req.body;
    let datauser = await db.User.findOne({
        where: {
            id: "1"
        }
    })
    const validPass = await matchPassword(password, datauser.password);
    console.log(validPass);
    if(!validPass){
        return res.status(400).json({ 
            success: false, 
            message: "รห้สผ่านเดิมไม่ถูกต้อง"
         });
    }
    let Newpassword = await hashPassword(newpassword);
    db.User.update(
        {
            password: Newpassword
        },
        {
            where:{
                id:req.user.id
            }
        }
    )
    .then((data) => {
        res.status(200).json({
            statusCode: 200,
            message:"ทำการเปลี่ยนรห้สผ่านสำเร็จ"
        })
    })
    
}

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

exports.img = async(req, res,) => {
    if(!req.files){
        res.status(400).json({
            statusCode: 400,
            message: "No files sent"
        })
    }
    const file = req.files.files;
    console.log(file);
    file.name = `profile_${req.params.id}${
        path.parse(file.name).ext
    }`;
    console.log(file);
    file.mv(`${process.env.FILE_UPLOAD_PATH}/profile/${file.name}`, async (err) => {
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
            return res.status(200).json({
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