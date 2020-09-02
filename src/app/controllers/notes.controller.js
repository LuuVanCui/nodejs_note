const Note = require('../models/note.model');
const { renderSync } = require('node-sass');
const { mongooseToObject, mutipleMongooseToObject } = require('../../until/mongoose');
const mongoose = require('../../until/mongoose');
const mongoseLib = require('mongoose');

class NotesController {
    // [GET] /notes/create
    create(req, res, next) {
        res.render('notes/create', {
            name: res.locals.user[0].name
        });
    }

    // [POST] /notes/store
    store(req, res, next) {
       const userLogin = res.locals.user[0];
       const userId = userLogin._id; 
       const note = new Note({title: '', description: '', userId});

       note.save()
        .then(() => res.redirect('/'))
        .catch(next);        
    }

    // [DELETE] /notes/:id
    destroy(req, res, next) {
        Note.delete({ _id: req.params.id })
            .then(() => res.send('Successfully deleted note!'))
            .catch(next);
    }

    // [DELETE] /notes/:id/force
    forceDestroy(req, res, next) {
        Note.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /notes/:id/edit
    edit(req, res, next) {
       Note.findById(req.params.id)
        .then(note => {
            res.render('notes/edit', {
                note: mongooseToObject(note)
            })
        })
        .catch(next);
    }

    // [PUT] /notes/:id
    update(req, res, next) {
        Note.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('Successfully updated note!'))
            .catch(next);
    }

    // [GET] /notes/search
    async search(req, res, next) {
        const notes = await Note.find();
        const notesMatched = notes.filter((note) => {
            return (note.title.toLowerCase().indexOf(req.query.q.toLowerCase()) !== -1) || 
                (note.description.toLowerCase().indexOf(req.query.q.toLowerCase()) !== -1);
        })
        
        res.render('home', {
            notes: mutipleMongooseToObject(notesMatched),
            key: req.query.q
        });
    }

    // [GET] notes/trash
    trash(req, res, next) {
        const userLogin = res.locals.user[0];
        const userId = userLogin._id;

        Note.findDeleted({ userId })
            .then(notes => res.render('notes/trash', {
                notes: mutipleMongooseToObject(notes),
                name: userLogin.name
            }))
            .catch(next);
    }
    // [PATCH] notes/:id/restore
    restore(req, res, next) {
        Note.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);   
    }

    // [GET] /:id
    displayNote(req, res, next) {
        const userId = res.locals.user[0]._id;
        Note.find({ userId }).sort({ 'updatedAt': -1 })
            .then(notes => res.send({notes}))
            .catch(next);
    }
}

module.exports = new NotesController;
