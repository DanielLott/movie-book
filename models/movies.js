module.exports = function(sequelize, DataTypes) {
    var Movies = sequelize.define("Movies", {
      Movie_Title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,40]
        }
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,10]
        }
      },
      URL: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,255]
        }
      }
    });

    Movies.associate = function(models) {
        Movies.hasMany(models.Reviews, {
          foreignKey: {
            allowNull: false,
            
          }
        });
        Movies.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Movies;
  };
  