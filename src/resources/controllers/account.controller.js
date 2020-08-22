const md5 = require('md5');
const User = require('../models/account.model');
const mongoose = require('mongoose');
const { mutipleMongooseToObject } = require('../../until/mongoose');

class AccountController {
    // [GET] /account
    index(req, res, next) {
        res.render('accounts/index');
    }

    // [GET] /account/login
    login(req, res, next) {
        res.render('accounts/login');
    }

    // [POST] account/login
    postLogin(req, res, next) {
        User.find({ username: req.body.username })
            .then(user => {
                if (user[0].password == req.body.password) {
                    res.cookie('userId', user[0]._id);
                    res.redirect('/');
                    return;
                }
                res.render('accounts/login', { message: 'Wrong password!' })
            })
            .catch(() => res.render('accounts/login', { message: 'Username does not exist!' }))
    }

    // [GET] /account/register
    register(req, res, next) {
        res.render('accounts/register');
    }

    // [POST] /account/create
    create(req, res, next) {
        // get input
        var userInput = req.body;

        // hash password
        userInput.password = md5(userInput.password);

        var user = User({
            _id: new mongoose.Types.ObjectId(),
            name: {
                firstName: userInput.firstName,
                lastName: userInput.lastName
            },
            username: userInput.username,
            password: userInput.password,
        });

        // save data
        user.save()
            .then(() => res.redirect('/'))
            .catch(error => console.log(error));
    }
}

module.exports = new AccountController;