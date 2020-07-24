// Import express package
const express = require('express');


// Initialize express
const app = express();
const mongoose = require('mongoose');

// Set up a view engine
app.set('view engine', 'ejs');


// Set a static folder
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/quiz', (req, res) => {
    res.render('quizRoom');
})
app.get('/result', (req, res) => {
    res.render('result');
})


// Connecting to the Database
let mongodb_url = 'mongodb+srv://quizApp:quizApp@cluster0.bdbrc.mongodb.net/quizApp?retryWrites=true&w=majority';
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
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});