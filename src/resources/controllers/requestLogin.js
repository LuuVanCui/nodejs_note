const User = require('../models/account.model');

function reqLogin(req, res, next) {
    if (!req.cookies.userId) {
        res.redirect('/account');
        return;
    }

    User.find({ _id: req.cookies.userId })
        .then((user) => {
            res.locals.user = user;
            next();
        })
        .catch(() => res.redirect('/account'));
} 

module.exports = { reqLogin };