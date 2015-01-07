var request = require('supertest'),
	assert = require('assert'),
	app = require('../../app');

var myStepDefinitionsWrapper = function () {

	this.World = require("../support/world.js").World;

	var userInput, response;

	this.When(/^The API consumer sends a (.*) to (.*)$/, function (method, path, callback) {
		if (method === 'POST') {
			request(app)
				.post(path)
				.send(userInput)
				.expect('Content-Type', /json/)
				.end(function(err, res){
					if (err) return callback(err);
					response = res;
					callback();
				});
		} else {
			throw 'mehod[' + method + '] not yet implemented';
		}
	});

	this.Then(/^The response should have the (\d+) status code$/, function (statusCode, callback) {
		assert.equal(response.status, statusCode);
		callback();
	});

	this.Then(/^The data of the author created should be the same as the data sent by arguments$/, function (callback) {
		var finalAuthor = JSON.parse(response.text);
		assert.equal(userInput.name, finalAuthor.name);
		assert.equal(userInput.birthday, finalAuthor.birthday);
		callback();
	});

	this.Then(/^The response must contain the fields _id, created and books$/, function (callback) {
		var finalAuthor = JSON.parse(response.text);
		assert.equal(finalAuthor.hasOwnProperty('_id'), true);
		assert.equal(finalAuthor.hasOwnProperty('created'), true);
		assert.equal(finalAuthor.hasOwnProperty('books'), true);
		callback();
	});

	this.Given(/^The (.*) and (.*) of an author$/, function (name, birthday, callback) {
		userInput = {
			name : name,
			birthday : birthday
		};
		callback();
	});
};
module.exports = myStepDefinitionsWrapper;
