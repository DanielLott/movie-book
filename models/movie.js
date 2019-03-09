module.exports = function (sequelize, DataTypes) {
    const Movie = sequelize.define("Movie", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        posterURL: {
            type: DataTypes.STRING
        },
        overview: {
            type: DataTypes.STRING
        }
    });

    Movie.associate = function (models) {
        // We're saying that a Movie should belong to a Fanatic
        // A Movie can't be created without a Fanatic due to the foreign key constraint
        Movie.belongsTo(models.Fanatic, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Movie;
};