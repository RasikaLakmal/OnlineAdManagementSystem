module.exports = (sequelize, DataTypes) => {
   
    const Seller = sequelize.define("seller", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        phone_number: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        confirm_password: {
            type: DataTypes.STRING,
        },
        profile_photo: {
            type: DataTypes.STRING,
        }

       // published: {
        //    type: DataTypes.BOOLEAN
        //}

    })

    return Seller

}