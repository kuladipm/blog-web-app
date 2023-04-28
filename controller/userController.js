const {
  createUserServices,
  isUserExistServices,
} = require("../services/userServices");
const { validateUserBody } = require("../util/validations");
const { isUserExist,createToken} = require("../middleware/auth");
let bcrypt = require("bcrypt");
const saltRounds = 10;
exports.createUser = async (req, res) => {
  try {
    let body = req.body;
    console.log(body);
    if (!validateUserBody(body)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter valid email" });
    } else if (await isUserExist(body.email)) {
      return res.status(400).send({
        status: false,
        message: "you are already registered please login",
      });
    } else {
      let bcryptPassword = bcrypt.hashSync(body.password, saltRounds);
      console.log(bcryptPassword);
      const result = await createUserServices(body, bcryptPassword);
      const token= createToken(body.email)
      return res.status(200).send({
        status: true,
        data: result,
        token:token,
        message: "user created successfully",
      });
    }
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    return res.status(e.statusCode).json({ message: e.message });
  }
};

exports.loginuser = async (req, res) => {
  try {
    let body = req.body;
    console.log(body);
    if (body.email.length === 0 || body.password.length === 0) {
      return res
        .status(400)
        .send({ status: false, message: "please enter valid login details" });
    } else {
      const result = await isUserExistServices(body.email);
      if (result === null) {
        return res.status(400).send({
          status: false,
          message: "You are not registered please registered first",
        });
      } else {
        console.log(result);
        const match = bcrypt.compareSync(body.password, result.password);
        console.log(match);
        if (!match) {
          return res
            .status(400)
            .send({ status: false, message: "please enter valid password" });
        } else {
          const token=await createToken(body.email)
          console.log(token)
          return res.status(200).send({
            status: true,
            data: result.user_id,
            token:token,
            message: `Hello ${result.full_name}`,
          });
        }
      }
    }
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    return res.status(e.statusCode).json({ message: e.message });
  }
};
