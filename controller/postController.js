const {
  createPostServices,
  viewPostServices,
  updatePostServices,
  deletePostServices,
} = require("../services/postServices");
const { validatePostBody } = require("../util/validations");
exports.createPost = async (req, res) => {
  try {
    let body = req.body;
    console.log(body);
    if (!validatePostBody(body)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter valid post details" });
    } else {
      const result = await createPostServices(body);
      console.log(result);
      return res.status(200).send({
        status: true,
        data: result.post_id,
        message: "post created successfully",
      });
    }
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    return res.status(e.statusCode).json({ message: e.message });
  }
};

exports.viewPost = async (req, res) => {
  try {
    let checkAutorizedUser = await req.checkId;
    let authorId = parseInt(req.params.id);
    console.log("token " + checkAutorizedUser);
    console.log("req " + authorId);
    if (authorId === "" || isNaN(authorId)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter valid id" });
    } else if (checkAutorizedUser !== authorId) {
      return res.status(400).send({
        status: false,
        message: "You are not authorized to view this post",
      });
    } else {
      const result = await viewPostServices(authorId);
      if (Object.keys(result).length === 0) {
        return res.status(404).send(`you are not posted anyting yet`);
      } else {
        return res.status(200).send({
          status: true,
          data: result,
          message: `post retrived successfully of author${authorId}`,
        });
      }
    }
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    return res.status(e.statusCode).json({ message: e.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    let checkAutorizedUser = await req.checkId;
    let body = req.body;
    let postId = req.params.id;
    console.log(body);
    if (!validatePostBody(body)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter valid update details" });
    } else if (checkAutorizedUser !== body.user_id) {
      return res.status(400).send({
        status: false,
        message: "You are not authorized to update this post",
      });
    } else {
      const result = await updatePostServices(body, postId);
      console.log(typeof(Object.values(result))+Object.values(result))
      if (Object.values(result)[0] ===0) {
        return res.status(404).send(`post with post id ${postId} are not found`);
      } else {
        return res.status(200).send({
          status: true,
          data:postId,
          message: `post updated successfully with post id ${postId} `,
        });
      }
    }
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    return res.status(e.statusCode).json({ message: e.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    let checkAutorizedUser = await req.checkId;
    let postId = req.body.post_id;
    let authorId = req.body.user_id;
    if (authorId === "" || isNaN(authorId) || postId === "" || isNaN(postId)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter valid id" });
    } else if (checkAutorizedUser !== authorId) {
      return res.status(400).send({
        status: false,
        message: "You are not authorized to delete this post",
      });
    } else {
      const result = await deletePostServices(postId);
      if (result === 0) {
        return res.status(404).send(`you are not posted anyting yet`);
      } else {
        return res.status(200).send({
          status: true,
          data: result,
          message: `post delete successfully of author${authorId}`,
        });
      }
    }
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    return res.status(e.statusCode).json({ message: e.message });
  }
};
