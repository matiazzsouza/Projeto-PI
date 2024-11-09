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
let score = 0;
let userAnswers = [];

function loadQuestion() {
    const questionContainer = document.querySelector('.question-section h1');
    const answerButtons = document.querySelectorAll('.answer');
    const currentQuestion = questions[currentQuestionIndex];

    // Exibe a pergunta
    questionContainer.textContent = currentQuestion.question;

    // Exibe as respostas
    answerButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];
        button.onclick = () => recordAnswer(index);
    });
}

function recordAnswer(selectedAnswer) {
    // Armazena a resposta do usuário
    userAnswers.push(selectedAnswer);

    // Verifica se a resposta está correta para atualizar a pontuação
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        score++;
    }

    // Passa para a próxima pergunta ou exibe o resultado
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        displayResult();
    }
}

function displayResult() {
    const questionContainer = document.querySelector('.quiz-container');
    questionContainer.innerHTML = `
        <h1>Quiz Concluído!</h1>
        <p>Você acertou ${score} de ${questions.length} perguntas.</p>
    `;

    questions.forEach((q, index) => {
        const isCorrect = userAnswers[index] === q.correctAnswer;
        const userAnswer = userAnswers[index] !== null ? q.answers[userAnswers[index]] : 'Nenhuma resposta';
        const correctAnswer = q.answers[q.correctAnswer];

        questionContainer.innerHTML += `
            <div>
                <p><strong>${index + 1}. ${q.question}</strong></p>
                <p>Sua resposta: <span style="color: ${isCorrect ? 'green' : 'red'}">${userAnswer}</span></p>
                ${!isCorrect ? `<p>Resposta correta: <span style="color: green">${correctAnswer}</span></p>` : ''}
            </div>
        `;
    });

    // Botão para voltar à página inicial do quiz
    questionContainer.innerHTML += `
        <a href="Quiz.html" class="button">tentar novamente</a>
    `;

    // Adiciona a pergunta de confirmação para voltar à Linha do Tempo
    const confirmDiv = document.createElement('div');
    confirmDiv.innerHTML = `
        <p>Deseja voltar para a Linha do Tempo?</p>
        <button onclick="redirectToTimeline(true)">Sim</button>
        <button onclick="redirectToTimeline(false)">Não</button>
    `;
    questionContainer.appendChild(confirmDiv);
}

function redirectToTimeline(answer) {
    if (answer) {
        window.location.href = 'Linha-do-tempo.html'; // Redireciona para a Linha do Tempo
    } else {
        window.location.href = 'Ciberfe.html'; // Redireciona de volta para o Quiz
    }
}

window.onload = loadQuestion;
