
var restful = require('node-restful'),
	mongoose = restful.mongoose;

var AuthorSchema = mongoose.Schema({
	created: { type: Date, default: Date.now },
	name: { type: String, required: true, trim: true, unique : true },
	birthday: { type: Date, required: false }
});

module.exports = AuthorSchema;
