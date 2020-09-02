const Note = require('../models/note.model');
const { mutipleMongooseToObject, mongooseToObject } = require('../../until/mongoose');
const { render } = require('node-sass');

class SiteController {
    // [GET] /
    async index(req, res, next) {
        const userLogin = res.locals.user;
        const userId = res.locals.user[0]._id;
        const name = userLogin[0].name;
        
        const notesTrash = await Note.findDeleted({ userId });
        
        Note.find({ userId }).sort({ 'updatedAt': -1 })
            .then(notes => res.render('home', { 
                notes: mutipleMongooseToObject(notes),
                notesTrash: mutipleMongooseToObject(notesTrash),
                name
             }))
            .catch(next);
    }
}

module.exports = new SiteController;