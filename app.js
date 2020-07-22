// Import express package
const express = require('express');


// Initialize express
const app = express();

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


// Define the port number
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});