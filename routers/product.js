var restful = require('node-restful'),
	ProductSchema = require("../schemas/product");

module.exports = function (app) {
	var Products = restful.model('products', ProductSchema);
	Products.methods(['get', 'post', 'put', 'delete']);
	Products.register(app, '/api/products');
};