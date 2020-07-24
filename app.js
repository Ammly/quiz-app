// Import express package
const express = require('express');
const quiz = require('./models/quiz');
const Topic = require('./models/topic');
const bodyParser = require('body-parser');


// Initialize express
const app = express();
const mongoose = require('mongoose');

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
// Set up a view engine
app.set('view engine', 'ejs');


// Set a static folder
app.use(express.static('public'));

app.get('/', (req, res) => {
    Topic.find({}, 'name').exec().then(topics => {
        console.log(topics);
        res.status(200).render('index', {
            topics: topics
        });
    }).catch(err => {
        console.log(err => {
            res.status(500).json({
                err: err
            });
        })
    });
})

app.get('/quiz/:id', (req, res) => {
    quiz.find({
        topic: req.params.id
    }, (error, db_questions) => {
        if (error) {
            console.log(error)
            res.status(500).json({
                error: error
            });
        } else {
            console.log(db_questions)
            res.status(200).render('quizRoom', {
                db_questions: db_questions
            })
        }
    })
})


app.get('/result', (req, res) => {
    // Store result
    res.render('result');
})

// Create topic
app.get('/create-topic', (req, res) => {
    res.render('create-topic');
})
app.post('/create-topic', (req, res) => {
    const questions = new Topic({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.topic

    })
    questions.save().then(response => {
        console.log(response);
        res.status(200).render('create-topic', {
            response: response
        });
    }).catch(err => {
        console.log(err => {
            res.status(500).json({
                err: err
            });
        })
        res.render('create-topic', {
            err: err
        });
    });
})

// Create Quiz
app.get('/create-quiz', (req, res) => {
    Topic.find({}, 'name').exec().then(topics => {
        console.log(topics);
        res.status(200).render('create-quiz', {
            topics: topics
        });
    }).catch(err => {
        console.log(err => {
            res.status(500).json({
                err: err
            });
        })
    });
    // res.render('create-quiz');
})
app.post('/create-quiz', (req, res) => {
    const questions = new quiz({
        _id: new mongoose.Types.ObjectId(),
        topic: req.body.topic,
        question: req.body.question,
        choice1: req.body.choice1,
        choice2: req.body.choice2,
        choice3: req.body.choice3,
        choice4: req.body.choice4,
        answer: req.body.answer,

    })
    questions.save().then(response => {
        console.log(response);
        res.status(200).render('create-quiz', {
            response: response
        });
    }).catch(err => {
        console.log(err => {
            res.status(500).json({
                err: err
            });
        })
        res.render('create-quiz', {
            error: err
        });
    });
})

// Connecting to the Database
let mongodb_url = 'mongodb+srv://quizApp:quizApp@cluster0.bdbrc.mongodb.net/quizApp?retryWrites=true&w=majority';
// let mongodb_url = 'localhost:27017';
let dbName = 'quizApp';
mongoose.connect(mongodb_url + dbName, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
let db = mongoose.connection;

// Check Connection
db.once('open', () => {
    console.log('Database connected successfully')
})

// Check for DB Errors
db.on('error', (error) => {
    console.log(error);
})


// Define the port number
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});