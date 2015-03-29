var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var channelSchema = mongoose.Schema({
    messageGroups: [{ type: ObjectId, ref: 'MessageGroup' }],
    name: { type: String },
    type: { type: String },
    admins: [{ type: ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Channel', channelSchema);