
const notesRouter = require('./notes.route');
const accountRouter = require('./account.route');
const authRouter = require('./auth.route');
const siteController = require('../../app/controllers/site.controller');
const reqLoginConstroller = require('../../app/controllers/requestLogin');

function route(app) {
    app.get('/', reqLoginConstroller.reqLogin, siteController.index);
    
    app.use('/notes', reqLoginConstroller.reqLogin, notesRouter);

    app.use('/account', accountRouter);

    app.use('/auth', authRouter);
}

module.exports = route;
