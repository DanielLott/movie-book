module.exports = function(sequelize, DataTypes) {
    var Reviews = sequelize.define("Reviews", {
      Author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,20]
        }
      },
      User_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,20]
        }
      },
      Review: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1,255]
          }
        },
    });

    Reviews.associate = function(models) {
        Reviews.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Reviews.belongsTo(models.Movies, {
            foreignKey: {
                allowNull: false
            }
        });
    } 

    return Reviews;
  };
  
