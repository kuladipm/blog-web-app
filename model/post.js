module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_by:{
        type:  DataTypes.STRING,
        allowNull: false
      },
      updated_by:{
        type:  DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: "posts",
      timestamps: true,
      createdAt: "date",
    }
  );
  return Post;
};
