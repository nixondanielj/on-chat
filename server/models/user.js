var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var ObjectId = mongoose.Schema.ObjectId;
var userSchema = mongoose.Schema({
    local: {
        displayName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    },
    activeChannels: [{ type: ObjectId, ref: 'Channel' }],
    inactiveChannels: [{ type: ObjectId, ref: 'Channel' }]
});

userSchema.methods.getHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);