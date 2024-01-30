const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const cookieparser = require('cookie-parser')
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn')
// const soleDistributor = require('./model/soleSchema');
const Products = require('./Admin/model/Products/productSchema')
const soleSchema = require('./Admin/model/SoleDistributor/soleSchema')
const disSchema = require('./SoleDistributor/model/Distributor/disSchema')
const adminSchema = require('./Admin/model/AdminLogin/adminSchema')
const Category = require('./Admin/model/Products/categorySchema')
const distSchema = require('./Distributor/model/disLogin/distSchema')
const Request = require('./Distributor/model/request/requestModel')

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieparser());
app.use('/uploads', express.static('uploads'));


//We link the router files to make our route easy
app.use(require('./Admin/adminRoutes/Products/productRoutes'));
app.use(require('./Admin/adminRoutes/Products/categoryRoutes'));
app.use(require('./Admin/adminRoutes/SoleDistributor/soleRoutes'))
app.use(require('./SoleDistributor/routes/Distributor/disRoutes'))
app.use('/widget/products', require('./Admin/Widget/widgetRoutes'));
app.use(require('./SoleDistributor/routes/soleLogin/soleAuth'))
app.use(require('./Admin/adminRoutes/AdminLogin/adminLogin'))
app.use(require('./Distributor/routes/disLogin/disAuth'))
app.use(require('./Distributor/routes/request/requestRoute'))
app.use(require('./SoleDistributor/routes/requests/soleRequest'))
app.use(require('./SoleDistributor/routes/order/orderRoute'))
app.use(require('./SoleDistributor/routes/Sell/sellRoutes'))
app.use(require('./Shopkeeper/routes/ShopLogin/shopRoutes'))
app.use(require('./Shopkeeper/routes/complain/complainRoutes'))
app.use(require('./Shopkeeper/routes/order/shopOrderRoute'))


const PORT = process.env.PORT;

app.listen(4000, () => {
    console.log(`Server is running at Port No ${PORT}`);
  });
  