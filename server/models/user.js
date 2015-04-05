var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var ObjectId = mongoose.Schema.ObjectId;
var userSchema = mongoose.Schema({
    // creating separate object for each associated login
    local: {
        displayName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    },
    channels: [{
        channel: { type: ObjectId, ref: 'Channel', required: true },
        activity: { type: Number, required: true, default: 0 },
        // this name overrides the default name of the channel if present
        name: { type: String }
    }]
});

userSchema.methods.getName = function() {
    // add more '||'s as we add new auth mechs
    return this.local.displayName || 'anonymous';
};

userSchema.methods.getHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);