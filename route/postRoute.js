const express =require('express')
const route=express.Router();
const {validateToken} = require("../middleware/auth");
const {createPost,viewPost,updatePost,deletePost}=require('../controller/postController')
/* create post - POST method */
route.post('/',validateToken, createPost)
/* read authors post - GET method */
route.get('/:id',validateToken,viewPost)
/* update authors post - patch method */
route.patch('/:id',validateToken,updatePost)
/* delete authors post - delete method */
route.delete('/',validateToken,deletePost)
module.exports=route;