const quizData = [
    {
        question: "HTML stands for?",
        options: [
            "Hyper Text Markup Language",
            "Hyperlink Text Mark",
            "Home Tool Markup language",
            "Hetero Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which tag creates hyperlink in HTML?",
        options: ["<link>", "<a>", "<href>", "<br>"],
        answer: "<a>"
    },
    {
        question: "CSS Property for text color",
        options: ["font-color", "text-color", "color", "background-color"],
        answer: "color"
    },
    {
        question: "Which CSS used for layout grid?",
        options: ["flexbox", "grid", "float", "layout"],
        answer: "grid"
    },
    {
        question: "JS used to select element?",
        options: ["querySelector", "getHTML", "selectNode", "All"],
        answer: "querySelector"
    },
    {
        question: "CSS stands for?",
        options: [
            "Creative style sheets",
            "Colorful Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets"
        ],
        answer: "Cascading Style Sheets"
    }
];

const questionNumberEl = document.getElementById("question-number");
const questionEl = document.getElementById("question");
const optionEl = document.querySelectorAll(".option");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

let currentQuestion = 0;
let score = 0;
let answerSelected = false;

function loadQuestion() {
    const { question, options } = quizData[currentQuestion];

    questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    questionEl.textContent = question;

    optionEl.forEach((option, index) => {
        option.textContent = options[index];
        option.classList.remove("correct", "incorrect");
        option.onclick = () => selectOption(option);
    });

    answerSelected = false;
    nextBtn.disabled = true;
}

function selectOption(option) {
    if (!answerSelected) {
        answerSelected = true;

        const selectedAnswer = option.textContent;
        const correctAnswer = quizData[currentQuestion].answer;

        if (selectedAnswer === correctAnswer) {
            option.classList.add("correct");
            score++;
        } else {
            option.classList.add("incorrect");

            optionEl.forEach(opt => {
                if (opt.textContent === correctAnswer) {
                    opt.classList.add("correct");
                }
            });
        }

        nextBtn.disabled = false;
    }
}

function loadNextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const quizEl = document.getElementById("quiz");
    quizEl.classList.add("hide");
    resultEl.classList.remove("hide");
    scoreEl.textContent = `${score} out of ${quizData.length}`;
}

nextBtn.addEventListener("click", loadNextQuestion);

loadQuestion();


