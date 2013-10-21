var assert = require('assert');
var restify = require('restify');

var client = restify.createJsonClient({
    url: 'http://localhost:8085',
    version: '~1.0'
});

var todo;

client.post('/todos', { 'name' : 'todo1' }, function (err, req, res, obj) {
  assert.ifError(err);
  console.log('Post returned: %j', obj);
  todo = obj;

  client.get('/todos', function (err, req, res, obj) {
    assert.ifError(err);
    console.log('Get returned: %j', obj);
  });

  client.get('/todos/' + todo.id, function (err, req, res, obj) {
    assert.ifError(err);
    console.log('Get Specific returned: %j', obj);
    assert.equal( obj.done, false);
  });

  client.put('/todos/' + todo.id, { 'name' : 'todo1','done' : true }, function (err, req, res, obj) {
    assert.ifError(err);
    console.log('Put returned: %j', obj);
  });

  client.get('/todos/' + todo.id, function (err, req, res, obj) {
    assert.ifError(err);
    assert.equal(obj.done, true);
    console.log('Get Specific Post update returned: %j', obj);
  });

});
