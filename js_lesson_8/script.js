
document.addEventListener("DOMContentLoaded", function () {
    const multiplicationType = document.getElementById("multiplication-type");
    const selectNumber = document.getElementById("select-number");
    const startButton = document.getElementById("start-quiz");
    const restartButton = document.getElementById("restart-quiz");
    const questionText = document.getElementById("question");
    const userAnswer = document.getElementById("user-answer");
    const checkAnswerButton = document.getElementById("check-answer");
    const hintButton = document.getElementById("hint");
    const correctAnswers = document.getElementById("correct-answers");
    const wrongAnswers = document.getElementById("wrong-answers");
    const hintsUsed = document.getElementById("hints-used");

    //  const correct_answer_1 = document.getElementById("correct-answer-1");
    // const wrong_answers_1 = document.getElementById("wrong_answers_1");
    //  const hints_used_1 = document.getElementById("wrong_answers_1");

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let firstNumber, secondNumber;
    let correctCount = 0;
    let wrongCount = 0;
    let hintCount = 0;

    selectNumber.innerHTML = "";

    restartButton.disabled = true;
    checkAnswerButton.disabled = true;
    hintButton.disabled = true;
    userAnswer.disabled = true;


    multiplicationType.addEventListener("change", function () {
        const type = multiplicationType.value;
        selectNumber.innerHTML = "";
        if (type === "single") {

            for (let i = 1; i <= 10; i++) {
                const option = document.createElement("option");
                option.value = i;
                option.text = i;
                selectNumber.appendChild(option);
            }
        } else if (type === "all") {

            for (let i = 1; i <= 10; i++) {
                const option = document.createElement("option");
                option.value = `1-${i}`;
                option.text = `1-${i}`;
                selectNumber.appendChild(option);
            }
        }
    });

    function generateQuestion() {
        const selectedNumber = selectNumber.value;
        if (multiplicationType.value === "all") {
            const range = selectedNumber.split("-");
            const start = Number(range[0]);
            const end = Number(range[1]);
            firstNumber = Math.floor(Math.random() * (end - start + 1)) + start;
        } else {
            firstNumber = Number(selectedNumber);
        }

        secondNumber = numbers[Math.floor(Math.random() * numbers.length)];

        const question = `Скільки буде: ${firstNumber} * ${secondNumber}?`;
        questionText.textContent = question;
        userAnswer.value = "";
        userAnswer.focus();
    }

    startButton.addEventListener("click", function () {
        correctCount = 0;
        wrongCount = 0;
        hintCount = 0;
        updateScore();
        generateQuestion();
        startButton.disabled = true;
        restartButton.disabled = false;
        checkAnswerButton.disabled = false;
        hintButton.disabled = false;
        userAnswer.disabled = false;

    });

    restartButton.addEventListener("click", function () {
        $("#error-message1").html("");
        $("#error-message2").html("");
        correctCount = 0;
        wrongCount = 0;
        hintCount = 0;
        updateScore();
        questionText.textContent = "";
        userAnswer.value = "";
        startButton.disabled = false;
        restartButton.disabled = true;

        checkAnswerButton.disabled = true;
        hintButton.disabled = true;
        userAnswer.disabled = true;
    });

    checkAnswerButton.addEventListener("click", function () {
        $("#error-message1").html("");
        $("#error-message2").html("");
        const answer = Number(userAnswer.value);
        const correctAnswer = firstNumber * secondNumber;

        if (!isNaN(answer) && userAnswer.value.trim() !== "") {
            if (answer === correctAnswer) {
                correctCount++;
            } else {
                wrongCount++;
            }
        } else {
            $("#error-message2").html("Введіть число!");
            return;
        }

        updateScore();
        generateQuestion();
    });

    hintButton.addEventListener("click", function () {
        $("#error-message2").html("");
        const correctAnswer = firstNumber * secondNumber;
        hintCount++;
        updateScore();
        $("#error-message1").html("Правильна відповідь: " + correctAnswer);
    });

    function updateScore() {
        correctAnswers.textContent = correctCount;
        wrongAnswers.textContent = wrongCount;
        hintsUsed.textContent = hintCount;
    }

    for (let i = 1; i <= 10; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        selectNumber.appendChild(option);
    }
});
