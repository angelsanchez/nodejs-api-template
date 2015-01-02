
var log = require('../util/log').logger,
	restful = require('node-restful'),
	BookSchema = require('../schemas/book'),
	authors = require('../controllers/author'),
	books = require('../controllers/book');


function validateBook (req, res, next) {
	if ( req.body.author ) {
		log.info('Searching the author [' + req.body.author + ']...');

		authors.model.findById(req.body.author, function (err, author) {
			if (err) return next(err);
			if (!author) {
				var authorErr = new Error('Author not found');
				authorErr.status = 400;
				return next(authorErr);
			}

			log.info('Valid author');
			next();
		});
	} else {
		next();
	}
}

function getBookWithAuthor (req, res, next) {

	books.getBookWithAuthor(req.param('id'), function (err, book) {
		if (err) return next(err);
		if (!book) {
			var bookNotFoundErr = new Error('Book not found');
			bookNotFoundErr.status = 404;
			return next(bookNotFoundErr);
		}

		res.json(book);
	});
}

module.exports = function (app) {
	var Books = restful.model('books', BookSchema);

	Books.methods(['post', 'put', 'delete']);

	Books.before('post', validateBook);

	Books.route(':id.get', getBookWithAuthor); // GET /api/book/:id

	Books.register(app, '/api/book');
};
