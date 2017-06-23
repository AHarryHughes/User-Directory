var express = require('express');
var mustacheExpress = require('mustache-express');
var data = {};
data.list = require('./data.js');


var application = express();

application.engine('mustache', mustacheExpress());

application.set('views', './views');
application.set('view engine', 'mustache');

application.use('/assets', express.static('./assets'));

application.get('/', function(request, response){
    response.render('index', data);
});

application.get('/:x', function(request, response){
    
    response.render('user_data', data.list.users[request.params.x - 1]);
});


application.listen(3000);
