const db=require('../model/index');
const post = require('../model/post');
exports.createPostServices = async (postDetails) => {
    try {
      postData = {
        title: postDetails.title,
        description: postDetails.description,
        author:postDetails.author,
        user_id:postDetails.user_id,
        created_by: postDetails.author,
        updated_by: postDetails.author,
      };
      let result = await db.post.create(postData);
      console.log(result)
      return result
    } catch (e) {
      throw Error(e);
    }
  };


  exports.viewPostServices = async (id) => {
    try {
      let result = await db.post.findAll({
        where: {
          user_id: id,
        },
      });
      return result
    } catch (e) {
      throw Error(e);
    }
  };

  
  exports.updatePostServices = async (updateData,id) => {
    try {
      postData = {
        title: updateData.title,
        description: updateData.description,
        author:updateData.author,
        updated_by: updateData.author,
      };
      let result = await db.post.update(postData,{where:{post_id:id}});
      return result
    } catch (e) {
      throw Error(e);
    }
  };

  exports.deletePostServices = async (postId) => {
    try {
      let result = await db.post.destroy({where:{post_id:postId}});
      console.log(result)
      return result
    } catch (e) {
      throw Error(e);
    }
  };