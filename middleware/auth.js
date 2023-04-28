const {isUserExistServices}=require ('../services/userServices')
const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });
const { sign, verify } = require("jsonwebtoken");
exports.createToken = (email) => {
  const token = sign({ email: email}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });
  return token;
};
exports.validateToken = async (req, res, next) => {
  const accessToken = req.headers.auth;
  if (accessToken === undefined) {
    res.status(401).json({
      status: 401,
      success: false,
      message: "Token doesn't exists",
    });
  } else if (!accessToken) {
    return res
      .status(404)
      .json({ status: 401, success: false, message: "Token doesn't exists" });
  }
  try {
    const validateToken = verify(accessToken, process.env.JWT_SECRET);
    if (validateToken) {
      res.locals.email = validateToken.email;
      let emailResp= await isUserExistServices(res.locals.email)
      console.log(emailResp.user_id )
      req.checkId=emailResp.user_id
      return next();
    }
  } catch (error) {
    res.status(401).send({
        status:401,
        success:false,
        message: "User not authorized" });
  }
};
exports.isUserExist=async(email)=>{
  let emailResp= await isUserExistServices(email)
  console.log(emailResp)
  if (emailResp===null||emailResp.rowCount===0) {
    return false;
  }
  else{
    return true;
  }
}