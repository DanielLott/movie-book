module.exports = function (sequelize, DataTypes) {
    const Review = sequelize.define("Review", {
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Review.associate = function (models) {
        // We're saying that a Review should belong to a Fanatic
        // A Review can't be created without a Fanatic due to the foreign key constraint
        Review.belongsTo(models.Fanatic, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Review;
};