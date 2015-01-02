
var restful = require('node-restful'),
	BookSchema = require("../schemas/book"),
	books = require('../controllers/book');


function setUpdatedField (req, res, next) {
	if ( typeof req.body === 'object' ) {
		req.body.updated = Date.now();
	}
	next();
}

function getLatestBooks (req, res, next) {
	books.getLatest(function (err, products) {
		if (err) return next(err);
		res.json(products);
	});
}

module.exports = function (app) {
	var Books = restful.model('books', BookSchema);

	Books.methods(['get', 'post', 'put', 'delete']);

	Books.before('put', setUpdatedField);

	Books.route('latest.get', getLatestBooks); // GET /api/book/latest

	Books.register(app, '/api/book');
};
