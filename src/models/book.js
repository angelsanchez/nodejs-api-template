var mongoose = require('mongoose'),
  authors = require('../manager/author'),
  BookSchema;

BookSchema = mongoose.Schema({
  created: {type: Date, default: Date.now},
  title: {type: String, required: true, trim: true, unique: true, index: true},
  price: {type: Number, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true, index: true}

}, {versionKey: false});

BookSchema.pre('save', function(next) {
  if (this.author) {
    authors.getAuthor(this.author, function(err, author) {
      if (err) {
        next(err);
      } else {
        next();
      }
    });

  } else {
    next();
  }
});

BookSchema.post('save', function(book) {
  authors.addBookToAuthor(book.author, book._id);
});

module.exports = mongoose.model('Book', BookSchema);
