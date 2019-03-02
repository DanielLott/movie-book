module.exports = function(sequelize, DataTypes) {
    var Reviews = sequelize.define("Reviews", {
      
      User_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,40]
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
        Reviews.Review.belongsTo(models.Movies, {
            foreignKey: {
                allowNull: false
            }
        });
    } 

    return Reviews;
  };
  
