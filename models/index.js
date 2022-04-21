const dbconfig = require('../config/dbConfig');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD, {
        host: dbconfig.HOST,
        dialect: dbconfig.dialect,
        operatorAliases: false,

        pool: {
            max: dbconfig.pool.max,
            min: dbconfig.pool.min,
            aquire: dbconfig.pool.aquire,
            idle: dbconfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error' + err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('../models/userModel')(sequelize, DataTypes)
db.ads = require('../models/adsModel')(sequelize, DataTypes)
db.sellers = require('../models/sellerModel')(sequelize, DataTypes)
db.sellerps = require('../models/sellerPModel')(sequelize, DataTypes)


db.sequelize.sync({ force: false})
.then(() => {
console.log('yes re-sync done!')    
})


module.exports = db