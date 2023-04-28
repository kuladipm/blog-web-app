const validator=require('validator')
exports.validateUserBody = (body) => {
  if (
    body.full_name.length===0 ||
      !/^[a-zA-Z ]*$/.test(body.full_name)||
    !validator.isEmail(body.email) ||
    body.password.length===0
  ) {
    return false;
  } else {
    return true;
  }
};
exports.validatePostBody = (body) => {
  if (
    body.title.length===0 ||
    !validator.isAlphanumeric(body.title) ||
    body.description.length===0 ||
    body.author.length===0
  ) {
    return false;
  } else {
    return true;
  }
};
