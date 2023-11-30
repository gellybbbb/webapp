const express=require ('express');
const router=express.Router();
const Controller=require('../Controller/controller');
const dotenv = require('dotenv').config()

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);
const secretKey =process.env.SECRETKEY



router.post('REGISTER_ENDPOINT',Controller.registerPost);

router.post('LOGIN_ENDPOINT',Controller.loginPost);

module.exports=router;