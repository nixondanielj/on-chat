var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var channelSchema = mongoose.Schema({
    messageGroups: [{ type: ObjectId, ref: 'MessageGroup' }],
    name: { type: String, required: true },
    type: { type: String, required: true },
    admins: [{ type: ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Channel', channelSchema);