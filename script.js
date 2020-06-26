const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let shuffledQuestions, currentQuestionIndex


startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

//function to begin the quiz
function startQuiz() {
    console.log('started')
    startButton.classList.add('hidden')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hidden')
    setNextQuestion()
}


//function to begin next question
function setNextQuestion() {
    resetState()
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
//change the visible answers
function resetState() {
    nextButton.classList.add('hidden')
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}
//shuffle through questions array
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1 ) {
        nextButton.classList.remove('hidden')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hidden')
    }
    
}
//correct and wrong functions
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
    element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
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
];