const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/dbConfig");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  logging: false,
});
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, DataTypes);
db.post = require("./post")(sequelize, DataTypes);
db.user.hasMany(db.post, {
  foreignKey: "user_id",
});
db.sequelize.sync({ force: false }).then(() => {});
module.exports = db;
