var assert = require('assert');
var restify = require('restify');

var client = restify.createJsonClient({
  	url: 'http://localhost:8080',
  	version: '~1.0'
});

client.put('/todos', { 'name' : 'todo1', 'body' : 'todo this today' }, function (err, req, res, obj) {
	assert.ifError(err);
	console.log('Put returned: %j', obj);

});

client.get('/todos', function (err, req, res, obj) {
	assert.ifError(err);
	console.log('Get returned: %j', obj);
}); 
	

client.get('/todos/todo1', function (err, req, res, obj) {
	assert.ifError(err);
	console.log('Get Specific returned: %j', obj);
}); 
