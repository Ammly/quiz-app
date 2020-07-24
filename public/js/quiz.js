// Import express package
const express = require('express');
const quiz = require('./models/quiz');
const Topic = require('./models/topic');
const bodyParser = require('body-parser');

var url_string = window.location.href;
var url = new URL(url_string);
var topic = url.searchParams.get("topic");
alert("You have selected " + topic + " topic. Good luck");

// Initialize express
const app = express();
const mongoose = require('mongoose');

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

// find questions
let questions = [];

quiz.find({
    topic: req.params.id
}).then(questions => {
    console.log(questions);
    question.append(questions);
}).catch(err => {
    console.log(err)
});



const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let finishQuiz = false;
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let correctAnswerCounter = 0;
let availableQuesions = [];
let wrongAnswerHolder = [];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = questions.length;
localStorage.setItem("totalQuestions", MAX_QUESTIONS);

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign("/result");
    } else {
        questionCounter++;
        document.getElementById("currentExamQuestion").textContent = questionCounter;
        document.getElementById("totalExamQuestions").textContent = MAX_QUESTIONS;
        const questionIndex = Math.floor(Math.random() * availableQuesions.length);
        currentQuestion = availableQuesions[questionIndex];
        question.innerText = currentQuestion.question;

        choices.forEach(choice => {
            const number = choice.dataset["number"];
            choice.innerText = currentQuestion["choice" + number];
        });

        availableQuesions.splice(questionIndex, 1);
        acceptingAnswers = true;
    }

};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target; // save to db
        selectedChoice.parentElement.classList.add("selectedAnswer");
        const selectedAnswer = selectedChoice.dataset["number"];

        if (selectedAnswer == currentQuestion.answer) {
            correctAnswerCounter++;
            localStorage.setItem("passed", correctAnswerCounter);
        } else {
            wrongAnswerHolder.push(currentQuestion.question);
            localStorage.setItem("passed", correctAnswerCounter);
            localStorage.setItem("failedQuestions", wrongAnswerHolder);
        }
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove("selectedAnswer");
            getNewQuestion();
        }, 1000);
    });
});
startGame();