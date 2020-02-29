const db = require('./db');

const Tenants = db.sequelize.define('tenants', {
	idAddress: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	name: {
		type: db.Sequelize.TEXT,
		allowNull: false
	},
	cpf: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	birth: {
		type: db.Sequelize.DATEONLY,
		allowNull: false,
	}
})

Tenants.sync({force: true})

module.exports = Tenants;
