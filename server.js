var restify = require('restify');
var _ = require('lodash');

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


var todoslist = {};
var id = 0;

server.get('/todos/:id', function (req, res, next) {
  res.send(todoslist[req.params.id]);
  return  next();
});

server.get('/todos/', function (req, res, next) {
  console.log(' TODOLIST ', todoslist );
  res.send( _.values(todoslist));
  return next();
});

server.post('/todos/', function (req, res, next) {
  todoslist[++id] = { id: id, name : req.body.name, done : false };
  res.send( todoslist[id] );
  return next();
});

server.put('/todos/:id', function (req, res, next) {
  todoslist[req.params.id] = { id: req.params.id, name : req.body.name, done : req.body.done };
  res.send( todoslist[req.params.id] );
  return next();
});

server.get(/(\/public)\/?.*/, restify.serveStatic({
  directory: './public/',
  default: "index.html"
}));

server.listen(8085, function () {
  console.log('%s listening at %s', server.name, server.url);
});
