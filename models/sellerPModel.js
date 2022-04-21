module.exports = (sequelize, DataTypes) => {
   
    const SellerP = sequelize.define("sellerps", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile_photo: {
            type: DataTypes.STRING,
        }
       
       
    })

    return SellerP

}