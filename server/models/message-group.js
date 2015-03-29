var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var messageGroupSchema = mongoose.Schema({
    messages: [{ type: ObjectId, ref: 'Message' }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MessageGroup', messageGroupSchema);