
var log = require('../util/log').logger,
	restful = require('node-restful'),
	mongoose = restful.mongoose,
	AuthorSchema = require("../schemas/book"),
	AuthorModel = mongoose.model('Author', AuthorSchema);


module.exports = {
	model : AuthorModel
};
