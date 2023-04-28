const express=require ("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");
dotenv.config({ path: "./config/config.env" });
const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
require ('./model/index')
const user=require('./route/userRoute')
const post=require('./route/postRoute')
app.use("/user", user);
app.use("/post", post);
app.listen(process.env.PORT,()=>{
    console.log(`server started on http://localhost:${process.env.PORT} `)
})