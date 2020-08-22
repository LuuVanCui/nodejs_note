const notesRouter = require('./notes.route');
const accountRouter = require('./account.route');
const siteController = require('../controllers/site.controller');
const reqLoginConstroller = require('../controllers/requestLogin');

function route(app) {
    app.get('/', reqLoginConstroller.reqLogin, siteController.index);
    
    app.use('/notes', reqLoginConstroller.reqLogin, notesRouter);

    app.use('/account', accountRouter);
}

module.exports = route;
