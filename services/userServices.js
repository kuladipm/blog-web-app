const db=require('../model/index')
exports.isUserExistServices = async (email) => {
  try {
    let user = await db.user.findOne({
      where: {
        email: email,
      },
    });
    
    return user
  } catch (e) {
    throw Error(e);
  }
};

exports.createUserServices = async (userDetail,bcryptPassword) => {
  console.log(bcryptPassword)
  try {
    user = {
      full_name: userDetail.full_name,
      email: userDetail.email,
      password:bcryptPassword,
      created_by: userDetail.email,
      updated_by: userDetail.email,
    };
    let result = await db.user.create(user);
    console.log(result)
    return result
  } catch (e) {
    throw Error(e);
  }
};



