
var log = require('../util/log').logger,
	restful = require('node-restful'),
	AuthorSchema = require("../schemas/author"),
	authors = require('../controllers/author');


module.exports = function (app) {
	var Books = restful.model('authors', AuthorSchema);

	Books.methods(['get', 'post', 'put', 'delete']);

	Books.register(app, '/api/author');
};
