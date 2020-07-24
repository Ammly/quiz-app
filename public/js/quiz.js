var url_string = window.location.href;
var url = new URL(url_string);
var topic = url.searchParams.get("topic");
alert("You have selected " + topic + " topic. Good luck");

// Fetch the correct set of questions
let questions = [
    {
        question: "What is the digit value of 3 in 567.3",
        choice1: "Ones",
        choice2: "Tenth",
        choice3: "Hundreds",
        choice4:"Thousand",
        answer: 2
    },
    {
        question: "What is the total value of 6 in 3986?",
        choice1: "60",
        choice2: "600",
        choice3: "6",
        choice4:"6000",
        answer: 3
    },
    {
        question: "What is 160 / 40?",
        choice1: "4",
        choice2: "6",
        choice3: "3",
        choice4:"5",
        answer: 1
    },
    {
        question: "What is 8 x 12?",
        choice1: "88",
        choice2: "112",
        choice3: "96",
        choice4:"97",
        answer: 3
    },
    {
        question: "What is the placevalue of 3 in 7345?",
        choice1: "Thousands",
        choice2: "Hundreds",
        choice3: "Ones",
        choice4:"Tens",
        answer: 2
    }
];

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