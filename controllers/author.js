var log = require('../util/log').logger,
	mongoose = require('mongoose'),
	AuthorSchema = require('../schemas/author'),
	Author = mongoose.model('Author', AuthorSchema);

function getAuthor(id, callback) {
	log.info('Looking for author[' + id + ']...');
	Author.findById(id).populate('books', 'title price').exec(callback);
}

function createAuthor(authorInput, callback) {
	log.info('Creating author...');
	var author = new Author(authorInput);
	author.save(callback);
}

function updateAuthor(id, authorInput, callback) {
	log.info('Updating author...');
	var author = new Author(authorInput);
	var upd = {
		$set : {
			name : author.name,
			birthday : author.birthday
		}
	};
	Author.findByIdAndUpdate(id, upd, callback);
}

function addBookToAuthor(authorId, bookId, callback) {
	Author.findByIdAndUpdate(authorId, {$push: { books : bookId }}, function (err, author) {
		log.info('Added book[' + bookId + '] to author[' + authorId + ']');
		if (callback) callback(err);
	});
}

function removeBookFromAuthor(authorId, bookId, callback) {
	Author.findByIdAndUpdate(authorId, {$pull: { books : bookId }}, function (err, author) {
		log.info('Removed book[' + bookId + '] from author[' + authorId + ']');
		if (callback) callback(err);
	});
}

function deleteAuthor(id, callback) {
	log.info('Removing author[' + id + ']...');
	Author.findById(id, {books : 1}, function (err, author) {
		if (err) return callback(err);
		if (!author) return callback(err, author);

		if (author.books && author.books.length > 0) {
			return callback(new Error('The author has associated books and cannot be deleted'));
		}

		Author.remove({_id: author._id}, function (err) {
			if (err) return callback(err);
			callback(err, author);
		});
	});
}

module.exports = {
	getAuthor: getAuthor,
	createAuthor: createAuthor,
	updateAuthor: updateAuthor,
	addBookToAuthor: addBookToAuthor,
	removeBookFromAuthor: removeBookFromAuthor,
	deleteAuthor: deleteAuthor
};
