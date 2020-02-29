//Modules
const express = require('express')
const app = express();
const cors = require('cors');
const path = require('path')
const morgan = require('morgan');

// Middleware
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Routes
app.use('/user', require('./routes/user'))


const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('PORT', process.env.PORT || 3000);
app.listen(app.get('PORT'), function () {
	console.log('Server rodando na porta ', app.get('PORT'))
});