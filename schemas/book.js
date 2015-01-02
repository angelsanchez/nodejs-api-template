
var restful = require('node-restful'),
	mongoose = restful.mongoose;

var BookSchema = mongoose.Schema({
	created: { type: Date, default: Date.now },
	title: { type: String, required: true, trim: true, unique : true, index : true },
	price: { type: Number, required: true },
	author: { type : mongoose.Schema.Types.ObjectId, ref : 'Author', required: true, index : true }
});

module.exports = BookSchema;
