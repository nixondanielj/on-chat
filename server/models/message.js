var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var messageSchema = mongoose.Schema({
    text: String,
    date: { type: Date, default: Date.now },
    sender: { type: ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Message', messageSchema);