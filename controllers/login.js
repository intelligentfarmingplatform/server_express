const db = require("../models");
const {hashPassword, sendTokenResponse, matchPassword} = require("../utils/auth");



exports.login = async(req, res ) => {
    let { username, password } = req.body;

    if(!username || !password){
        console.log("no user in database");
    }

    db.User.findAll({
        where:{
            userName: username,
        }
    })
    .then((datauser) => {
        if(datauser.length == 1){           
            matchPassword(password, datauser[0].password)
            .then((data) => {
                if(data === true){
                    sendTokenResponse(datauser[0].id, 200, res)
                }else{
                    return res.status(500).json({
                    statusCode: 400,
                    message: "รห้สผ่านไม่ถูกต้อง"
                    });   
                }
            }).catch((err) => {
                return res.status(500).json({
                    statusCode: 500,
                    message: "Server Error"
                });
            })
        }else {
            return res.status(500).json({
                statusCode: 400,
                message: "ชื่อผู้ใช้ไม่ถูกต้อง"
            });
        }
    }).catch((err) => {
        return res.status(500).json({
            statusCode: 500,
            message: "Server Error"
        });
    })
}



exports.sing = async(req, res ) => {
    let { username, password, serial } = req.body;
    password = await hashPassword(password);

    db.tbl_Serial.findAll({
        where:{
            serial: serial,
        }
    }) 
    .then((data) => {
        if(!data.length == 0){
            db.User.findAll({
                where:{
                    userName: username,
                }
                })
                .then( async (data) => {
                    if(data.length == 0){
                        db.User.create({
                        userName: username,
                        password: password,
                        status_level: "members",
                        Serial: serial
                    })
                .then(( data ) =>{
                    sendTokenResponse(data.id, 200, res) //#ff0000
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
                    
                }else {
                    return res.status(400).json({
                        statusCode: 400,
                        message:"ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว"
                    });
                 }
            }).catch((err) => {
                res.status(500).json({
                    message:"ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว",
                });
            })
            
        }else if(!data.length == 0){

        }else{
            return res.status(400).json({
                statusCode: 400,
                message:"Serial นี้ไม่มีอยู่ในระบบ"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            statusCode: 500,
            message: "Server Error"
        })
    })
    // ///เช็คserail
    
}

