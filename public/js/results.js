console.log("Marking started...")
const questions = localStorage.getItem("totalQuestions");
const passedQuestions = localStorage.getItem("passed");
console.log("Passed Questions:" + passedQuestions);
console.log("Total Questions:" + questions);
document.getElementById("passedQuestions").textContent = passedQuestions;
document.getElementById("totalQuestions").textContent = questions;

calculatePercentage = (correctAnwers, totalQuestions) => {
    if (correctAnwers == 0) {
        return 0;
    }
    return Math.floor((correctAnwers / totalQuestions) * 100);
}

const resultsInPercent = calculatePercentage(passedQuestions, questions);
console.log("Percentage:" + resultsInPercent);
document.getElementById("resultInPercent").textContent = resultsInPercent;   
if (resultsInPercent >= 80) {
    console.log("Passed!");
    document.getElementById("pass").style.display = "inline";
} else {
    console.log("fail!");
    document.getElementById("fail").style.display = "inline";
}
const results = document.getElementsByClassName("resultInPercent");
results.innerText = resultsInPercent;