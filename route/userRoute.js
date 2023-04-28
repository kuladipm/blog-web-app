const express =require('express');
const route=express.Router();
const {createUser,loginuser}=require ('../controller/userController')
/* Create - POST method */
route.post('/', createUser)
/* Login - POST method */
route.post('/login', loginuser)
module.exports=route