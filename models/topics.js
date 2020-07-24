const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema for our database
var TopicSchema = new Schema({
    name: String,
    date: {
        type: Date,
        default: Date()
    }

});

// convert the schema into a Model
let Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;