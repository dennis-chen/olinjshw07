var mongoose = require('mongoose');

var twotSchema = mongoose.Schema({
    creator: String,
    creator_id: String,
    text: String,
    time: String
});

module.exports.twot = mongoose.model('twot',twotSchema);
module.exports.twotSchema = twotSchema;
