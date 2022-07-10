module.exports = (sequelize, DataTypes) => {
   
    const Ads = sequelize.define("ads", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
        },
        photos: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        phone_number: {
            type: DataTypes.STRING,
        },
        topic: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.STRING,
        }


      

    })

    return Ads

}