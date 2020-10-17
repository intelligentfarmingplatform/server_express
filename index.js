const express = require('express');
const bodyPasser = require("body-parser");
const app = express(); 
const db = require('./models');
const cors = require("cors");
const path = require('path');
const fileupload = require('express-fileupload');
require('dotenv').config();
const userRoute = require("./routes/user")
const sellproductsRoute = require("./routes/sellproducts")
const orderRoute = require("./routes/order")
const loginRoute = require("./routes/login")
const dblistRoute = require("./routes/dblist")
const dbrealtimeRoute = require("./routes/dbrealtime")


const port = process.env.PORT || 3001

app.use(express.static(path.join(__dirname, 'img')))
app.use(cors());
app.use(fileupload());
app.use(bodyPasser.json());
app.use(bodyPasser.urlencoded({extended: true}));

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/user',userRoute);
app.use('/api/sellproducts',sellproductsRoute);
app.use('/api/order',orderRoute);
app.use('/api/login',loginRoute);
app.use('/api/dblist',dblistRoute);
app.use('/api/dbrealtime',dbrealtimeRoute);


db.sequelize.sync()
    .then(() =>
        app.listen(port, () => console.log(`Example app listening at http: //localhost:${port}`))
    )