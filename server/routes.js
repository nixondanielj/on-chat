module.exports = function(app, passport){
    var authFunc = function(req, res, next){
        if(req.isAuthenticated()){
            next();
        } else {
            res.sendStatus(401);
        }
    };
    // mount controllers
    app.use('/user', require('./controllers/user')(authFunc));
    app.use('/auth', require('./controllers/auth')(authFunc, passport));
    app.use('/channel', authFunc, require('./controllers/channel'));
    app.use('/message', authFunc, require('./controllers/message'));
};