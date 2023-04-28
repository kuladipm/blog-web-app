
module.exports=(sequelize,DataTypes)=>{
    const User = sequelize.define('users', {
     user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      full_name: {
        type: DataTypes.STRING,
         allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
        isEmail: true
      }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_by:{
        type:  DataTypes.STRING,
        allowNull: false
      },
      updated_by:{
        type:  DataTypes.STRING,
        allowNull: false
      }
    }, {
        tableName: 'users',
        timestamps: true,
      
    });
    return User;
    }