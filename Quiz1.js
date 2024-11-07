const questions = [
    {
        question: "Quem foi o autor da maioria das cartas do Novo Testamento?",
        answers: ["Pedro", "João", "Paulo", "Tiago"],
        correctAnswer: 2
    },
    {
        question: "Quantos livros há na Bíblia?",
        answers: ["39", "66", "73", "27"],
        correctAnswer: 1
    },
    {
        question: "Qual é o primeiro livro da Bíblia?",
        answers: ["Êxodo", "Gênesis", "Levítico", "Números"],
        correctAnswer: 1
    },
    {
        question: "Qual é o significado da palavra 'Evangelho'?",
        answers: ["História Sagrada", "Boas Novas", "Relato dos Apóstolos", "Mensagem de Deus"],
        correctAnswer: 1
    },
    {
        question: "Quem libertou os israelitas da escravidão no Egito?",
        answers: ["José", "Moisés", "Davi", "Salomão"],
        correctAnswer: 1
    }
];

let currentQuestionIndex = 0;
let timer;
const timePerQuestion = 120;
let score = 0;
let userAnswers = [];

function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    const q = questions[currentQuestionIndex];

    const timerDiv = document.createElement('div');
    timerDiv.classList.add('timer');
    timerDiv.innerText = `Tempo restante: ${timePerQuestion} segundos`;
    questionContainer.appendChild(timerDiv);

    const questionTitle = document.createElement('h3');
    questionTitle.textContent = q.question;
    questionContainer.appendChild(questionTitle);

    q.answers.forEach((answer, i) => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="question${currentQuestionIndex}" value="${i}"> ${answer}`;
        questionContainer.appendChild(label);
    });

    startTimer(timerDiv);
}

function startTimer(timerDiv) {
    let timeLeft = timePerQuestion;
    timer = setInterval(() => {
        timeLeft--;
        timerDiv.innerText = `Tempo restante: ${timeLeft} segundos`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitAnswers();
        }
    }, 1000);
}

function submitAnswers() {
    clearInterval(timer);

    const selectedAnswer = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    userAnswers.push(selectedAnswer ? parseInt(selectedAnswer.value) : null);

    if (selectedAnswer && parseInt(selectedAnswer.value) === questions[currentQuestionIndex].correctAnswer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        displayResult();
    }
}

function displayResult() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h2>Quiz concluído!</h2><p>Você acertou ${score} de ${questions.length} perguntas.</p>`;

    questions.forEach((q, index) => {
        const isCorrect = userAnswers[index] === q.correctAnswer;
        const userAnswer = userAnswers[index] !== null ? q.answers[userAnswers[index]] : 'Nenhuma resposta';
        const correctAnswer = q.answers[q.correctAnswer];

        resultDiv.innerHTML += `
            <div>
                <p><strong>${index + 1}. ${q.question}</strong></p>
                <p>Sua resposta: <span style="color: ${isCorrect ? 'green' : 'red'}">${userAnswer}</span></p>
                ${!isCorrect ? `<p>Resposta correta: <span style="color: green">${correctAnswer}</span></p>` : ''}
            </div>
        `;
    });
}

window.onload = loadQuestion;
