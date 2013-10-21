var restify = require('restify');

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


var todoslist = [];


server.get('/todos/:name', function (req, res, next) {
  console.log(" %s params ", req.params.name); 
  res.send(req.params.name);
  return  next();
});

server.get('/todos/', function (req, res, next) {
  console.log(' PARAMS ', todoslist );
  res.send( todoslist );
  return next();
});

server.put('/todos/', function (req, res, next) {
  todoslist[req.body.name] = { 'body' : req.body.body, 'done' : false };
  res.send( todoslist );
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
