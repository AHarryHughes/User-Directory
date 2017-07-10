var express = require('express');
var mustacheExpress = require('mustache-express');
var robots = require('./models/robots.js');
//var data = {};
//data.list = require('./data.js');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/robots');

var application = express();

application.engine('mustache', mustacheExpress());

application.set('views', './views');
application.set('view engine', 'mustache');

application.use('/assets', express.static('./assets'));

application.get('/', async function (request, response) {
    //response.render('index', data);
    //return the entire mongodb
    var daRobots = await robots.find();
    response.render('index', {daRobots: daRobots});
});

application.get('/:x', async function (request, response) {
    //response.render('user_data', data.list.users[request.params.x - 1]);
    //search through mongodb for user by id
    let id = request.params.x;
    let robot = await robots.find({
        "id": id
    });
    console.log(robot);
    response.render('user_data', {robot: robot[0]});
});

application.listen(4000);