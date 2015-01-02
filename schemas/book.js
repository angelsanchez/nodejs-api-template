var restful = require('node-restful'),
	mongoose = restful.mongoose;

var BookSchema = mongoose.Schema({
	title: { type: String, required: true, trim: true },
	price: { type: Number, required: true },
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now, index: true }
});

module.exports = BookSchema;
