// setup
var http = require('http');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var server = http.createServer(app);

// config
var config = require('./server/config/config.js');
mongoose.connect(config.db.url);

var sessionStore = new MongoStore({ mongooseConnection: mongoose.connection });

require('./server/config/passport')(passport);

require('./server/config/socket')
    (require('socket.io')(server), 
    cookieParser, 
    sessionStore, 
    config);

// express setup
// logging
app.use(morgan('dev'));
// parse cookies
app.use(cookieParser());
// parse body - deprecated and should be updated
app.use(bodyParser());
// passport
app.use(session({ 
    secret: config.auth.secret,
    key: config.auth.key,
    store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());

// routing
require('./server/routes.js')(app, passport);
app.use(express.static(__dirname + '/public'));

require('./server/config/seed')();

//launch
server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function(){
    console.log('Running...');
});