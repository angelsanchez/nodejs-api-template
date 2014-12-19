var restful = require('node-restful'),
	mongoose = restful.mongoose;

var ProductSchema = mongoose.Schema({
	name: String,
	price: Number
});

module.exports = ProductSchema;
