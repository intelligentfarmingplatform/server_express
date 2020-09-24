const express = require('express');
const bodyPasser = require("body-parser");
const app = express(); 
const db = require('./models');
const cors = require("cors");
require('dotenv').config();
const userRoute = require("./routes/user")

const port = process.env.PORT || 3001

app.use(bodyPasser.json());
app.use(bodyPasser.urlencoded({extended: true}));

app.get('/', (req, res) => res.send('Hello World!'))
app.use("/api/user",userRoute);


db.sequelize.sync()
    .then(() =>
        app.listen(port, () => console.log(`Example app listening at http: //localhost:${port}`))
    )