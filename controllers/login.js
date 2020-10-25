const db = require("../models");
const {hashPassword, sendTokenResponse} = require("../utils/auth");



exports.login = async(req, res ) => {
    const { username, password } = req.body;

    if(!username || !password){
        console.log("no user in database");
    }

    db.User.findAll({
        where:{
            userName: username,
            password : password
        }
    })
    .then((data) => {
        if(data.length != 0){
            return res.status(200).json({
                statusCode: 200,
                // data : data,
                serial: data[0].Serial
            })
        }else {
            res.status.json({
                statusCode: 400,
                message:"ชื่อผู้ใช้หรือรห้สผ่านไม่ถูกต้อง"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message:"ชื่อผู้ใช้หรือรห้สผ่านไม่ถูกต้อง"
        });;
    })
}



exports.res = async(req, res ) => {
    let { username, password, serial } = req.body;
    password = await hashPassword(password);
    console.log(password);
    ///เช็คserail
    db.User.findAll({
        where:{
            userName: username,
        }
    })
     .then( async (data) => {
         if(data.length == 0){
            // password = hashPassword(password);      
            db.User.create({
                ////ซีเรียล#ff0000
                userName: username,
                password: password,
                status_level: "members",
                Serial: serial
            })
        .then(( data ) =>{
            console.log(data.id);
            sendTokenResponse(data.id, 200, res) //#ff0000
            // res.status(200).json({
            //     statusCode: 201,
            //     message: "ทำการสมัครสมาชิกสำเร็จ",
            //     data: data,

            // }); 
        })
        .catch((err) => {
            res.status(500).send(err);
        });
            
        }else {
            return res.status.json({
                statusCode: 400,
                message:"ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว"
            });
         }
    }).catch((err) => {
        res.status(500).json({
            message:"ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว",
        });
    })
}

