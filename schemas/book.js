
var restful = require('node-restful'),
	mongoose = restful.mongoose;

var BookSchema = mongoose.Schema({
	created: { type: Date, default: Date.now },
	title: { type: String, required: true, trim: true, unique : true, index : true },
	price: { type: Number, required: true },
	author: { type : mongoose.Schema.Types.ObjectId, ref : 'Author', required: true, index : true }

}, { versionKey: false });

BookSchema.pre('save', function (next) {
	if (this.author) {
		require('../controllers/author').getAuthor(this.author, function (err, author) {
			if (err) {
				next(err);
			} else if (!author) {
				next(new Error('Invalid Author Id'));
			} else {
				next();
			}
		});

	} else {
		next();
	}
});

BookSchema.post('save', function (book) {
	require('../controllers/author').addBookToAuthor(book.author, book._id);
});

module.exports = BookSchema;
