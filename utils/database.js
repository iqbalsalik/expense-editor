const Sequelize = require("sequelize");

const sequelize = new Sequelize("expensetracker","root","syedashu02",{
    dialect:"mysql",
    host:"localhost"
})

module.exports = sequelize;