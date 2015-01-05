
var log = require('../util/log').logger,
	books = require('../controllers/book');


function getAllBooks(req, res, next) {
	books.findBooks({}, function (err, books) {
		if (err) return next(err);
		res.json(books);
	});
}

function getBookWithAuthor(req, res, next) {
	books.getBookWithAuthor(req.param('id'), function (err, book) {
		if (err) {
			next(err);
		} else if (!book) {
			res.sendStatus(404);
		} else {
			res.json(book);
		}
	});
}

function createBook(req, res, next) {
	books.createBook(req.body, function (err, book) {
		if (err) {
			next(err);
		} else {
			res.status(201).json(book);
		}
	});
}

function updateBook(req, res, next) {
	books.updateBook(req.param('id'), req.body, function (err, book) {
		if (err) {
			next(err);
		} else {
			res.status(200).json(book);
		}
	});
}

function deleteBook(req, res, next) {
	books.deleteBook(req.param('id'), function (err, book) {
		if (err) {
			next(err);
		} else if (!book) {
			res.sendStatus(404);
		} else {
			res.sendStatus(204);
		}
	});
}

module.exports = function (app) {
	app.route('/api/book').
		get(getAllBooks).
		post(createBook);

	app.route('/api/book/:id').
		get(getBookWithAuthor).
		delete(deleteBook).
		put(updateBook);
};
