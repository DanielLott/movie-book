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
      Seen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });

    Movies.associate = function(models) {
        Movies.hasMany(models.Reviews, {
            onDelete: "cascade"
        });
        Movies.belongsTo(models.User.User_Name, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Movies;
  };
  