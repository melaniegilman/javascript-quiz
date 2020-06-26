const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
startButton.addEventListener('click', startQuiz)


//function to begin the quiz
function startQuiz() {
    console.log('started')
    startButton.classList.add('hidden')
    questionContainerElement.classList.remove('hidden')

}

function nextQuestion() {

}

function selectAnswer() {

}