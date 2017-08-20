var express = require('express');
var mustacheExpress = require('mustache-express');
var bodyParser = require('body-parser');
var robots = require('./models/robots.js');
//var data = {};
//data.list = require('./data.js');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/robots');

var application = express();

application.use(bodyParser());
application.use(bodyParser.urlencoded({ extended: true }));

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

application.get('/userdata/:x', async function (request, response) {
    //response.render('user_data', data.list.users[request.params.x - 1]);
    //search through mongodb for user by id
    let id = request.params.x;
    let robot = await robots.find({
        "id": id
    });
    response.render('user_data', {robot: robot[0]});
});

application.get('/employeeSelect', async function (request, response) {
    //return robots based on select
    console.log('/employeeSelect');
    let selectValue = request.query.employeeType;
    if(selectValue == "Unemployed"){
        console.log("Unemployed");
        let daRobots = await robots.find({
                job: null
        });
        response.render('index', {daRobots: daRobots});
    }
    else if(selectValue == "Employed"){
        console.log("Employed");
        let daRobots = await robots.find({
                job: {$ne:null}
        });
        response.render('index', {daRobots: daRobots});
    }
    else{
        console.log("else");
        response.redirect('/');
    }
});

application.listen(4000);