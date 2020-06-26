const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let shuffledQuestions, currentQuestionIndex


startButton.addEventListener('click', startQuiz)


//function to begin the quiz
function startQuiz() {
    console.log('started')
    startButton.classList.add('hidden')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hidden')
    setNextQuestion()
}



function setNextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

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



function selectAnswer(e) {

}

const questions = [
    {
        question: 'A Boolean value will always be...',
        answers:[
            {text: 'True or False', correct: true},
            {text: 'A number', correct: false},
            {text: 'A string', correct: false},
            {text: 'None of the above', correct: false}
        ]
    }
];