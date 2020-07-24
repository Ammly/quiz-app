var url_string = window.location.href;
var url = new URL(url_string);
var topic = url.searchParams.get("topic");
alert("You have selected " + topic + " topic. Good luck");

// Fetch the correct set of questions
let questions = [{
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
},
{
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
},
{
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
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