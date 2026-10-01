document.addEventListener("DOMContentLoaded", function () {

    const alertForm = document.getElementById("alertForm");

    if (alertForm) {

        alertForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const location = document.getElementById("location").value;
            const message = document.getElementById("message").value.trim();

            if (!location || !message) {

                alert("Por favor, completa los campos antes de enviar.");

                return;
            }

            alert(
                "Tu mensaje fue registrado como demostración.\n\n" +
                "Recuerda: esta versión de la página es un prototipo educativo " +
                "y todavía no envía mensajes a un servidor real."
            );

            alertForm.reset();

        });

    }


    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

});
    // ==============================
    // AVENTURA INTERACTIVA
    // ==============================

    window.mostrarInfo = function (etapa) {

        const title = document.getElementById("info-title");
        const text = document.getElementById("info-text");

        if (etapa === "observa") {

            title.textContent = "👀 OBSERVA";

            text.textContent =
                "Presta atención a lo que ocurre a tu alrededor. " +
                "Las burlas constantes, la exclusión, las amenazas " +
                "o las agresiones no deben tomarse como un juego.";

        }


        if (etapa === "comprende") {

            title.textContent = "🧠 COMPRENDE";

            text.textContent =
                "Comprende que el bullying puede afectar el bienestar " +
                "y la convivencia. Tratar a los demás con respeto " +
                "ayuda a crear espacios donde todos puedan sentirse seguros.";

        }


        if (etapa === "actua") {

            title.textContent = "🤝 ACTÚA";

            text.textContent =
                "No participes en las agresiones ni compartas contenido " +
                "que pueda lastimar a otra persona. Busca ayuda de un " +
                "adulto de confianza y comunica lo ocurrido.";

        }


        if (etapa === "transforma") {

            title.textContent = "🌱 TRANSFORMA";

            text.textContent =
                "Puedes contribuir a una mejor convivencia mediante " +
                "el respeto, la empatía y la inclusión. Una acción " +
                "responsable también puede ayudar a otra persona.";

        }


        document.getElementById("adventure-info").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    };
    // ==============================
    // DESAFÍO FINAL
    // ==============================

    const questions = [

        {
            question: "¿Qué debemos hacer si observamos una situación de bullying?",

            answers: [
                "Ignorarla siempre",
                "Reconocer la situación y buscar ayuda",
                "Compartirla en redes sociales"
            ],

            correct: 1
        },


        {
            question: "¿Cuál de estas acciones ayuda a prevenir el bullying?",

            answers: [
                "Respetar las diferencias",
                "Burlarse de los demás",
                "Excluir a una persona"
            ],

            correct: 0
        },


        {
            question: "¿Qué debemos evitar cuando ocurre una agresión?",

            answers: [
                "Buscar ayuda",
                "Hablar con una persona adulta",
                "Participar o compartir contenido dañino"
            ],

            correct: 2
        },


        {
            question: "¿A quién podemos acudir cuando necesitamos ayuda?",

            answers: [
                "A una persona adulta de confianza",
                "A nadie",
                "Solo a desconocidos de internet"
            ],

            correct: 0
        },


        {
            question: "¿Qué significa transformar nuestra convivencia?",

            answers: [
                "Promover respeto, empatía e inclusión",
                "Dejar que los problemas continúen",
                "Hacer bromas sobre otras personas"
            ],

            correct: 0
        }

    ];


    let currentQuestion = 0;

    let score = 0;

    let selectedAnswer = false;


    const questionNumber =
        document.getElementById("question-number");

    const questionText =
        document.getElementById("question-text");

    const answersContainer =
        document.getElementById("answers");

    const nextButton =
        document.getElementById("next-question");

    const quizContainer =
        document.getElementById("quiz-container");

    const quizResult =
        document.getElementById("quiz-result");

    const resultText =
        document.getElementById("result-text");

    const restartButton =
        document.getElementById("restart-quiz");


    function loadQuestion() {

        const question = questions[currentQuestion];

        questionNumber.textContent =
            currentQuestion + 1;

        questionText.textContent =
            question.question;

        answersContainer.innerHTML = "";

        nextButton.disabled = true;

        selectedAnswer = false;


        question.answers.forEach(function (answer, index) {

            const button =
                document.createElement("button");

            button.textContent = answer;

            button.className =
                "answer-button";

            button.type = "button";


            button.addEventListener("click", function () {

                const allButtons =
                    document.querySelectorAll(".answer-button");

                allButtons.forEach(function (item) {

                    item.classList.remove("selected");

                });


                button.classList.add("selected");

                selectedAnswer = index;

                nextButton.disabled = false;

            });


            answersContainer.appendChild(button);

        });

    }


    nextButton.addEventListener("click", function () {

        if (selectedAnswer === false) {

            return;

        }


        if (
            selectedAnswer ===
            questions[currentQuestion].correct
        ) {

            score++;

        }


        currentQuestion++;


        if (currentQuestion < questions.length) {

            loadQuestion();

        } else {

            showResult();

        }

    });


    function showResult() {

        quizContainer.style.display = "none";

        quizResult.style.display = "block";


        resultText.textContent =
            "Obtuviste " +
            score +
            " de " +
            questions.length +
            " respuestas correctas. ¡Gracias por completar la aventura!";

    }


    restartButton.addEventListener("click", function () {

        currentQuestion = 0;

        score = 0;

        quizContainer.style.display = "block";

        quizResult.style.display = "none";

        loadQuestion();

    });


    if (
        quizContainer &&
        questionText &&
        answersContainer
    ) {

        loadQuestion();

    }