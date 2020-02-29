const db = require('./db');

const Addresses = db.sequelize.define('addresses', {
	idUser: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	street: {
		type: db.Sequelize.TEXT,
		allowNull: false
	},
	number: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	neighborhood: {
		type: db.Sequelize.TEXT,
		allowNull: false
	},
	complement: {
		type: db.Sequelize.TEXT
	},
	CEP: {
		type: db.Sequelize.BIGINT,
		allowNull: false
	}
})

Addresses.sync({force: true})

module.exports = Addresses;
