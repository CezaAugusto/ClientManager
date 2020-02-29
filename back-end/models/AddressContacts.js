const db = require('./db');

const AddressContacts = db.sequelize.define('addresscontacts', {
	idAddress: {
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

AddressContacts.sync({force: true})

module.exports = AddressContacts;