const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema for our database
var QuestionsSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    topic: String,
    question: String,
    choice1: String,
    choice2: String,
    choice3: String,
    choice4: String,
    answer: Number,
    date: {
        type: Date,
        default: Date()
    }

});

// convert the schema into a Model
let Questions = mongoose.model('Questions', QuestionsSchema);

module.exports = Questions;