var log = require('../util/log'),
  restify = require('restify'),
  authors = require('../manager/author');

module.exports = function(server) {
  server.get('/api/author', getAllAuthors);
  server.post('/api/author', createAuthor);
  server.get('/api/author/:id', getAuthor);
  server.del('/api/author/:id', deleteAuthor);
  server.put('/api/author/:id', updateAuthor);
};

function getAllAuthors(req, res, next) {
  authors.findAuthors({}, function(err, authors) {
    if (err) return next(err);
    res.send(authors);
    return next();
  });
}

function createAuthor(req, res, next) {
  authors.createAuthor(req.body, function(err, author) {
    if (err) {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new restify.InvalidContentError({body: err}));
      } else {
        return next(err);
      }
    }

    res.send(201, author);
    return next();
  });
}

function updateAuthor(req, res, next) {
  authors.updateAuthor(req.params.id, req.body, function(err, author) {
    if (err) return next(err);
    res.send(200, author);
    return next();
  });
}

function getAuthor(req, res, next) {
  authors.getAuthor(req.params.id, function(err, author) {
    if (err) return next(err);

    if (!author) {
      res.send(404);
    } else {
      res.send(author);
    }

    return next();
  });
}

function deleteAuthor(req, res, next) {
  authors.deleteAuthor(req.params.id, function(err, author) {
    if (err) return next(err);

    if (author) {
      res.send(204);
    } else {
      res.send(404);
    }

    return next();
  });
}
