const db = require('./db');

const Users = db.sequelize.define('users', {
	name: {
		type: db.Sequelize.TEXT,
		allowNull: false
	},
	cpf: {
		type: db.Sequelize.BIGINT,
		allowNull: false
	},
	birth: {
		type: db.Sequelize.DATEONLY,
		allowNull: false,
		
	}
})

Users.sync({force: true})

module.exports = Users;