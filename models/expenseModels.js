const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const ExpenseList = sequelize.define("expensetable",{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey : true
    },
    Amount:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    Description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Category:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = ExpenseList;