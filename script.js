const startBtn = document.querySelector('#start-btn')
const startButton = document.getElementById('start-btn')
const timeLeftDisplay = document.querySelector("#time-left")
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const initialBtn = document.querySelector("#initials-btn")
const initialInput = document.querySelector("#initial-input")
const initialEl = document.getElementById("initials")
const scoreDisplay = document.getElementById("high-scores")
const highScores = []
const answerStatusEl = document.getElementById("answer-status")
var selectAnswerTimeout = null
let timeLeft = 10;
let score = 0;
let shuffledQuestions, currentQuestionIndex

function resetState() {
    timeLeftDisplay.innerHTML = 10
    timeLeft = 10
    startTimer()
    score = 0
    initialInput.value = ""
    initialBtn.setAttribute("disabled", true)
  }
  //function to begin the quiz
function startQuiz() {
    resetState()
    startButton.classList.add("hide")
    scoreDisplay.classList.add("hide")
    questionContainerElement.classList.remove("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion();
}
// timer variables
var myTimer = null
var timer = function(){
    if(timeLeft <= 0) {
        stopTimer();
        enterInitials();
    }
    const time = --timeLeft
    timeLeftDisplay.innerHTML = time < 0 ? 0 : timeLeft
    }
 //timer function
 function startTimer() {
     myTimer = setInterval(timer, 1000)
}
function stopTimer() {
   if (myTimer) {clearInterval(myTimer)}
   timeLeftDisplay.innerHTML = timeLeft < 0 ? 0 : timeLeft
} 


//function to begin next question
function setNextQuestion() {
    //change the visible answers
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
    showQuestion(shuffledQuestions[currentQuestionIndex])

}
//function to make question appear
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
//shuffle through questions array
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    keepScore(correct)
    answerStatusEl.innerHTML = correct ? "Correct, one point has been added!" : "Wrong, two seconds have been deducted"
    selectAnswerTimeout = setTimeout(() => {
    if(shuffledQuestions.length > currentQuestionIndex + 1 ) {
        currentQuestionIndex++
            answerStatusEl.innerHTML = ""
            setNextQuestion()
        } else {
            stopTimer()
            enterInitials()
            answerStatusEl.innerHTML = ""
        }
    }, 1000)
}

function enterInitials() {
    initialEl.classList.remove("hide")
    questionContainerElement.classList.add("hide")
}

//ensure initials are entered before saving
function handleSubmitButtonState() {
    if (initialInput.value) {
        initialBtn.removeAttribute("disabled")
    } else {
       initialBtn.setAttribute("disabled", true)
    }
 }
 //ensure that initials are entered before saving
 function handleSubmitButtonState() {
    if (initialInput.value) {
        initialBtn.removeAttribute("disabled")
    } else {
       initialBtn.setAttribute("disabled", true)
    }
 }
 function displayScores() {
    initialEl.classList.add("hide")
    scoreDisplay.classList.remove("hide")
    startButton.innerText = "restart"
    startButton.classList.remove("hide")
 }
function viewHighScores() {
    stopTimer()
    clearTimeout(selectAnswerTimeout)
    questionContainerElement.classList.add("hide")
    displayScores()
}
function keepScore(isCorrect) {
    if(isCorrect) {
        score++
        console.log(score);
    } else {
        timeLeft -=2
        console.log(timeLeft);
    }
}  
//save scores
function saveScore() {
    var scoreDiv = document.createElement("div")
    scoreDiv.innerHTML = "<h2>" + initialInput.value + "</h2><div>" + score + "</div"
    document.getElementById("scoreContainer").append(scoreDiv)
    displayScores()
}
//array of questions and answers
const questions = [
    {
        question: 'A Boolean value will always be...',
        answers:[
            {text: 'A number', correct: false},
            {text: 'True/False', correct: true},
            {text: 'A string', correct: false},
            {text: 'None are true', correct: false}
        ]
    },
    {
        question: 'Which of the following is true about variable naming conventions in JavaScript?',
        answers: [
            {text: 'JavaScript variables must begin with a letter, underscore, or dollar sign.', correct: false},
            {text: 'Javascript variables are case sensitive.', correct: false},
            {text: 'Both are true.', correct: true},
            {text: 'Neither are true.', correct: false}
        ]
    },
    {
        question: 'Which of the following type of variable is visible everywhere in your JavaScript code?',
        answers: [
            {text: 'Global variable', correct: true},
            {text:'Local variable', correct: false},
            {text: 'Both are true', correct: false},
            {text: 'Neither are true', correct: false}
        ]
    },
    {
        question: 'Which built-in method adds one or more elements to the end of an array and returns the new length of the array?',
        answers: [
            {text: 'last()', correct: false},
            {text: 'put()', correct: false},
            {text: 'push()', correct: true},
            {text: 'None are true', correct: false}
        ]
    },
    {
        question: 'What should appear at the very end of your JavaScript file?',
        answers: [
            {text: 'The </script>', correct: true},
            {text: 'The <script>', correct: false},
            {text: 'The END statement', correct: false},
            {text: 'None are true', correct: false}
        ]
    }
]

document.addEventListener('DOMContentLoaded', () => {
    startButton.addEventListener('click', startQuiz)
    initialBtn.addEventListener("click", saveScore)
    initialInput.addEventListener("input", handleSubmitButtonState)
})