const db = require('./db');

const Contacts = db.sequelize.define('contacts', {
	idUser: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	contact: {
		type: db.Sequelize.TEXT,
		allowNull: false
	},
	type: {
		type: db.Sequelize.ENUM(),
		values: ['email', 'phone']
	}
})


Contacts.sync({force: true})


module.exports = Contacts;