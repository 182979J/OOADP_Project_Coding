// Bring in Sequelize
const Sequelize = require('sequelize');
// Bring in db.json which contains database name, username and password
const db = require('./db');
// Instantiates Sequelize with database parameters
const sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host, // Name or IP address of MySQL server
    dialect: 'mysql', // Tells squelize that MySQL is used
    operatorsAliases: false,
    define: {
        timestamps: false // Don't create timestamp fields in database
    },
    pool: { // Database system params, don't need to know
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
module.exports = sequelize;



// // Bring in Sequelize
// const Sequelize = require('sequelize');
// // Bring in db.json which contains database name, username and password
// const db = require('./db');
// const mySQLDB = require('./DBConfig');
// const delivery = require('../models/Delivery');
// const OrderItems = require('../models/OrderItems');
// // Instantiates Sequelize with database parameters
// const sequelize = new Sequelize(db.database, db.username, db.password, {
//     host: db.host, // Name or IP address of MySQL server
//     dialect: 'mysql', // Tells squelize that MySQL is used
//     operatorsAliases: false,
//     define: {
//         timestamps: false // Don't create timestamp fields in database
//     },
//     pool: { // Database system params, don't need to know
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },
// });

// const setUpDB = (drop) => {
//     mySQLDB.authenticate()
//         .then(() => {
//             console.log('Delivery database connected');
//         })
//         .then(() => {
//             OrderItems.hasMany(OrderItems, { foreignKey: 'cOrderNo' });
//             delivery.belongsTo(delivery, { foreignKey: 'cOrderNo' });
//             /*
//             Defines the relationship where a user has many videos.
//             In this case the primary key from user will be a foreign key
//             in video.
//             */
//             // user.hasMany(video); //impt
//             mySQLDB.sync({ // Creates table if none exists
//                 force: drop
//             }).then(() => {
//                 console.log('Create tables if none exists')
//             }).catch(err => console.log(err))
//         })
//         .catch(err => console.log('Error: ' + err));
// };

// module.exports = sequelize;