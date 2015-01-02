
var restful = require('node-restful'),
	mongoose = restful.mongoose;

var AuthorSchema = mongoose.Schema({
	name: { type: String, required: true, trim: true },
	birthday: { type: Date, required: false }
});

module.exports = AuthorSchema;
