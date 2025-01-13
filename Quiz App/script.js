const quizData = [
    {
        question: "Apa Nama Ibu Kota Sulawesi Selatan?",
        answers: ["Makassar", "Maros", "Jeneponto", "Pangkep"],
        correct: "Makassar"
    },
    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: "4"
    },
    {
        question: "Who is the President of the USA in 2024?",
        answers: ["Joe Biden", "Donald Trump", "Barack Obama", "Kamala Harris"],
        correct: "Joe Biden"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerListElement = document.getElementById("answer-list");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const quizContainer = document.getElementById("quiz");
const restartButton = document.getElementById("restart-btn");

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    answerListElement.innerHTML = '';

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => selectAnswer(answer));
        const li = document.createElement('li');
        li.appendChild(button);
        answerListElement.appendChild(li);
    });
}

function selectAnswer(selectedAnswer) {
    const correctAnswer = quizData[currentQuestionIndex].correct;
    if (selectedAnswer === correctAnswer) {
        score++;
    }
    nextButton.classList.remove('hidden');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
    nextButton.classList.add('hidden');
});

function showResults() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreElement.innerText = `${score}/${quizData.length}`;
}

restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    loadQuestion();
});

loadQuestion();
