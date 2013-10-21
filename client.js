var assert = require('assert');
var restify = require('restify');

var client = restify.createJsonClient({
  	url: 'http://localhost:8080',
  	version: '~1.0'
});

client.put('/todos', { 'name' : 'todo1', 'body' : 'todo this today' }, function (err, req, res, obj) {
	assert.ifError(err);
	console.log('Server returned: %j', obj);
});

client.get('/todos', function (err, req, res, obj) {
	assert.ifError(err);
	console.log('Server returned: %j', obj);
}); 
