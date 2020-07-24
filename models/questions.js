const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema for our database
var QuestionsSchema = new Schema({
    question: String,
    choice1: String,
    choice2: String,
    choice3: String,
    choice4: String,
    answer: String,
    date: {
        type: Date,
        default: Date()
    }

});

// convert the schema into a Model
let Questions = mongoose.model('Questions', QuestionsSchema);

module.exports = Questions;