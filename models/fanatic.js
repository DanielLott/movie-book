// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our Fanatic model
module.exports = function (sequelize, DataTypes) {
    const Fanatic = sequelize.define("Fanatic", {
        // The name cannot be null, and must be a proper name before creation
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            //   unique: true,
            validate: {
                len: [1, 20]
            }
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    // Creating a custom method for our Fanatic model. This will check if an unhashed password entered by the fanatic can be compared to the hashed password stored in our database
    Fanatic.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the Fanatic Model lifecycle
    // In this case, before a Fanatic is created, we will automatically hash their password
    Fanatic.addHook("beforeCreate", function (fanatic) {
        fanatic.password = bcrypt.hashSync(fanatic.password, bcrypt.genSaltSync(10), null);
    });
    Fanatic.associate = function(models) {
        Fanatic.hasMany(models.Reviews, {
          foreignKey: {
            allowNull: false
          },
          onDelete: "cascade"
        });
        Fanatic.hasMany(models.Movies, {
          foreignKey: {
            allowNull: false
          },
          onDelete: "cascade"
        });
        
      }  
      
    return Fanatic;
};
