
var log = require('../util/log').logger,
	books = require('../controllers/book');


function getAllBooks(req, res, next) {
	books.findBooks({}, function (err, books) {
		if (err) return next(err);
		res.send(books);
		return next();
	});
}

function getBookWithAuthor(req, res, next) {
	books.getBookWithAuthor(req.params.id, function (err, book) {
		if (err) return next(err);

		if (!book) {
			res.send(404);
		} else {
			res.send(book);
		}

		return next();
	});
}

function createBook(req, res, next) {
	books.createBook(req.body, function (err, book) {
		if (err) return next(err);
		res.send(201, book);
		return next();
	});
}

function updateBook(req, res, next) {
	books.updateBook(req.params.id, req.body, function (err, book) {
		if (err) return next(err);
		res.send(200, book);
		return next();
	});
}

function deleteBook(req, res, next) {
	books.deleteBook(req.params.id, function (err, book) {
		if (err) return next(err);

		if (book) {
			res.send(204);
		} else {
			res.send(404);
		}

		return next();
	});
}

module.exports = function (app) {
	app.get('/api/book', getAllBooks);
	app.post('/api/book', createBook);

	app.get('/api/book/:id', getBookWithAuthor);
	app.del('/api/book/:id', deleteBook);
	app.put('/api/book/:id', updateBook);
};
