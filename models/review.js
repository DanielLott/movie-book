module.exports = function(sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
      
      User_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,40]
        }
      },
      Review: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1,255]
          }
        }
    });

    Review.associate = function(models) {
        Review.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Review.belongsTo(models.Movie, {
            foreignKey: {
                allowNull: false
            }
        });
    }; 

    return Review;
  };
  
