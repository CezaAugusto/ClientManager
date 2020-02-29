const Sequelize = require('sequelize');

//Database Connection
const sequelize = new Sequelize('ClientManager', 'root', 'root', {
	host: "localhost",
	dialect: "mysql"
})

module.exports = { 
	Sequelize:Sequelize,
	sequelize:sequelize
}