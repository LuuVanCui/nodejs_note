const express = require('express');
const router = express.Router();

const notesController = require('../../app/controllers/notes.controller');

router.get('/create', notesController.create);
router.post('/store', notesController.store);
router.get('/:id/edit', notesController.edit);
router.put('/:id', notesController.update);
router.delete('/:id', notesController.destroy);
router.delete('/:id/force', notesController.forceDestroy);
router.get('/search', notesController.search);
router.get('/trash', notesController.trash);
router.patch('/:id/restore', notesController.restore);

module.exports = router;
