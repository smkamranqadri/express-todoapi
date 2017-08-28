export default {
	secret: 'express-app-secret',
	database: process.env.MONGOLAB_URI || 'mongodb://localhost/todoApp'
}