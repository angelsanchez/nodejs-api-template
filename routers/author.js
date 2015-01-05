var log = require('../util/log').logger,
	authors = require('../controllers/author');


function createAuthor(req, res, next) {
	authors.createAuthor(req.body, function (err, author) {
		if (err) {
			next(err);
		} else {
			res.status(201).json(author);
		}
	});
}

function getAuthor(req, res, next) {
	authors.getAuthor(req.param('id'), function (err, author) {
		if (err) {
			next(err);
		} else if (!author) {
			res.sendStatus(404);
		} else {
			res.json(author);
		}
	});
}

function deleteAuthor(req, res, next) {
	authors.deleteAuthor(req.param('id'), function (err, author) {
		if (err) {
			next(err);
		} else if (!author) {
			res.sendStatus(404);
		} else {
			res.sendStatus(204);
		}
	});
}

module.exports = function (app) {

	app.route('/api/author').
		post(createAuthor);

	app.route('/api/author/:id').
		get(getAuthor).
		delete(deleteAuthor);

};
