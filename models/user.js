// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    User_Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,20]
      }
    },
    
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Join_Date: {
      type: DataTypes.DATETIME,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  
  User.associate = function(models) {
    User.hasMany(models.Reviews, {
      onDelete: "cascade"
    });
    User.hasMany(models.Movies, {
      onDelete: "cascade"
    });
    
  }  
  return User;

  

};
