const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Note = new Schema({
    title: { type: String },
    description: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId }
}, {
    // Tự tạo thời gian tạo ra và update
    timestamps: true,
});

// Add plugin 
Note.plugin(mongoose_delete, { 
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Note', Note);