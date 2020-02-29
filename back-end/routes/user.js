const express = require('express')
const routes = express.Router()
const Users = require((__dirname, '../models/User.js'))
const Contacts = require((__dirname, '../models/Contact.js'))
const Addresses = require((__dirname, '../models/Address.js'))
const AddressContacts = require((__dirname, '../models/AddressContacts.js'))
const Tenants = require((__dirname, '../models/Tenants.js'))

//CRUD USER

//SEARCH USER 
routes.get('/get-user/:id', async (req, res) => {
	const id = req.params.id
	try {
		const userDB = await Users.findAll({ where: { 'id': id } })
			.then(function (user) {
				res.json(user)
			})
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
//CREATE USER
routes.post('/add-user', async (req, res) => {
	const body = req.body;
	try {
		const userDB = await Users.create(body[0])
		res.json(userDB);
	} catch (err) {

		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
//SELECT ALL USERS
routes.get('/', async (req, res) => {
	try {
		const userDB = await Users.findAll({ order: [['id', 'ASC']] })
			.then(function (users) {
				res.json(users)
			})
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
//UPDATE USER
routes.put('/update/:id', async (req, res) => {
	const id = req.params.id
	const body = req.body
	try {
		const userDB = await Users.update({ name: body[0].name, birth: body[0].birth }, { where: { 'id': id } })
		res.json(userDB)
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}

})
//DELETE USER
routes.delete('/user-delete/:id', async (req, res) => {
	const id = req.params.id
	try {
		const userDB = await Users.destroy({ where: { 'id': id } })
		const contactDB = await Contacts.destroy({ where: { 'idUser': id } })
		const addressDB = await Addresses.destroy({ where: { 'idUser': id } })
		res.json(userDB)
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
//CRUD CONTACTS
//CREATE CONTACT
routes.post('/add-contact/:id', async (req, res) => {
	const body = req.body;
	try {
		const contactDB = await Contacts.create({ idUser: req.params.id, contact: body[0].contact, type: body[0].type })
		res.json(contactDB);
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
//SELECT CONTACT
routes.get('/contact/:id', async (req, res) => {
	const id = req.params.id
	try {
		const contactDB = await Contacts.findAll({ where: { 'idUser': id } })
			.then(function (contacts) {
				res.json(contacts)
			})
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
//UPDATE CONTACT
routes.put('/update-contact/:id', async (req, res) => {
	const id = req.params.id
	const body = req.body
	try {
		const contactDB = await Contacts.update({ contact: body[0].contact, type: body[0].type }, { where: { 'id': id } })
		res.json(contactDB)
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}

})
//DELETE CONTACT
routes.delete('/delete-contact/:id', async (req, res) => {
	const id = req.params.id
	try {
		const contactDB = await Contacts.destroy({ where: { 'id': id } })
		res.json(contactDB)
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})

//CRUD ADDRESS
//SEARCH ADDRESS
routes.get('/get-address/:id', async (req, res) => {
	const id = req.params.id
	try {
		const addressDB = await Addresses.findAll({ where: { 'id': id } })
			.then(function (address) {
				res.json(address)
			})
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
//CREATE ADDRESS
routes.post('/add-address/:id', async (req, res) => {
	const body = req.body;
	try {
		//erros com Addresses.create(body)
		const addressDB = Addresses.create({
			'idUser': body[0].idUser, 'street': body[0].street,
			'number': body[0].number, 'neighborhood': body[0].neighborhood, 'complement': body[0].complement,
			'CEP': body[0].CEP
		})
		res.json(addressDB);
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
//SELECT ADDRESS
routes.get('/address/:id', async (req, res) => {
	const id = req.params.id

	try {
		const addressDB = Addresses.findAll({ where: { 'idUser': id } }).then(function (addresses) {
			res.json(addresses)
		})
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
//UPDATE ADDRESS
routes.put('/edit-address/:id', async (req, res) => {
	const id = req.params.id
	const body = req.body;
	try {
		const addressDB = Addresses.update({
			'street': body[0].street,
			'number': body[0].number, 'neighborhood': body[0].neighborhood, 'complement': body[0].complement,
			'CEP': body[0].CEP
		}, { where: { 'id': id } })
		res.json(addressDB);
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
//DELETE ADDRESS
routes.delete('/delete-address/:id', async (req, res) => {
	const id = req.params.id
	try {
		const addressDB = await Addresses.destroy({ where: { 'id': id } })
		res.json(contactDB)
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})

//CRUD TENANTS
//CREATE TENANTS
routes.post('/add-tenants', async (req, res) => {
	const body = req.body;
	console.log(body)
	try {
		const tenantsDB = await Tenants.create(body[0])
		res.json(tenantsDB);
	} catch (err) {

		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
//SELECT TENANTS
routes.get('/tenants/:id', async (req, res) => {
	const id = req.params.id
	console.log(id)
	try {
		const tenantsDB = await Tenants.findAll({ where: { 'idAddress': id } })
			.then(function (tenantsDB) {
				res.json(tenantsDB)
			})
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
//UPDATE TENANTS
routes.put('/update-tenants/:id', async (req, res) => {
	const id = req.params.id
	const body = req.body
	try {
		const tenantsDB = await Tenants.update({ name: body[0].name, birth: body[0].birth }, { where: { 'id': id } })
		res.json(tenantsDB)
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
//DELETE TENANTS
routes.delete('/delete-tenants/:id', async (req, res) => {
	const id = req.params.id
	try {
		const tenantsDB = await Tenants.destroy({ where: { 'id': id } })
		res.json(tenantsDB)
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
//CRUD CONTACTS-ADDRESS
//CREATE CONTACTS-ADDRESS
routes.post('/add-contacts-address/:id', async (req, res) => {
	const body = req.body;
	try {
		const contactDB = await AddressContacts.create({ idAddress: req.params.id, contact: body[0].contact, type: body[0].type })
		res.json(contactDB);
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
//SELECT CONTACTS-ADDRESS
routes.get('/get-contacts-address/:id', async (req, res) => {
	const id = req.params.id
	try {
		const contactDB = await AddressContacts.findAll({ where: { 'idAddress': id } })
			.then(function (tenantsDB) {
				res.json(tenantsDB)
			})
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
//UPDATE CONTACTS-ADDRESS
routes.put('/update-contacts-address/:id', async (req, res) => {
	const id = req.params.id
	const body = req.body
	try {
		const contactDB = await AddressContacts.update({ contact: body[0].contact, type: body[0].type }, { where: { 'id': id } })
		res.json(contactDB)
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}

})
//DELETE CONTACTS-ADDRESS
routes.delete('/delete-contacts-address/:id', async (req, res) => {
	const id = req.params.id
	try {
		const addressDB = await AddressContacts.destroy({ where: { 'id': id } })
		res.json(addressDB)
	} catch (err) {
		return res.status(500).json({
			mensage: 'Ocorreu um erro',
			err
		})
	}
})
module.exports = routes
