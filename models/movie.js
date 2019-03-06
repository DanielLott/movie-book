module.exports = function(sequelize, DataTypes) {
    var Movie = sequelize.define("Movie", {
      Movie_Title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,255]
        }
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,255]
        }
      },
      URL: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1,255]
        }
      }
    });

    Movie.associate = function(models) {
        Movie.belongsTo(models.Review, {
            onDelete: "cascade"
        });
        Movie.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Movie;
  };