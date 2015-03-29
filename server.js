var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser');

var jsonParser = require('body-parser').json();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var sessionStore = new MongoStore({ mongooseConnection: mongoose.connection });

// app setup
var app = express();
var server = http.createServer(app);
app.use(express.static(__dirname + '/public'));
app.use(jsonParser);

var key = 'mykey', 
    secret = 'fakeSecret';

app.use(session({
    key: key,
    secret: secret,
    store: sessionStore
}));

var User = require('./models/User');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function(user, callback){
        console.log('serializing user.');
        callback(null, user.id);
    });

passport.deserializeUser(function(id, callback){
       console.log('deserialize user.');
       User.findById(id, function(err, user){
           if(!err && user){
               callback(null, user);
           } else {
               callback(err, user);
           }
       });
    });

passport.use(
    new LocalStrategy(
        function(username, password, done){
            User.findOne({ email: username }, function(err, user){
                if(err){
                    console.log(err);
                    return done(err);
                }
                if (!user){
                    return done(null, false, {message: 'Invalid email'});
                }
                if(user.password !== password){
                    return done(null, false, {message: 'Incorrect password'});
                }
                return done(null, user);
            });
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/user', require('./controllers/UserController'));

app.get('/status', function(request, response, next){
    if(request.isAuthenticated()){
        response.sendStatus(200);
    } else {
        response.sendStatus(401);
    }
});

app.post('/login', function(request, response, next){
    passport.authenticate('local', function(err, user, info){
        if(err){
            next(err);
        } else if (!user){
            response.sendStatus(401);
        } else {
            response.sendStatus(200);
        }
    })(request, response, next);
});
    
// socket io setup
var io = require('socket.io')(server);
var socketPassport = require('passport.socketio');
io.set('authorization', socketPassport.authorize({
    cookieParser: cookieParser,
    key: key,
    secret: secret,
    store: sessionStore,
    success: function(data, accept){
        console.log('Socket connection authenticated');
        accept(null, true);
    },
    error: function(data, message, error, accept){
        console.log('Socket connection authentication failed');
        console.log(message);
        
        // if there was a real error
        if(error) {
            accept(new Error(message));
        }
        
        // if user was unauthorized
        accept(null, false);
    }
}));

io.on('connection', function(socket){
    console.log('Added a new socket');
    socket.on('message-send', function(message){
        
    });
    socket.on('test', function(){
        if(socket.request.user && socket.request.user.logged_in){
            socket.emit('authed');
        }
    });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});