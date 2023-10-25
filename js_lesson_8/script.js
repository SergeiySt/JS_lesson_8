
document.addEventListener("DOMContentLoaded", function () {
    const selectNumber = document.getElementById("select-number");
    const startButton = document.getElementById("start-quiz");
    const restartButton = document.getElementById("restart-quiz"); // Добавили кнопку "Начать сначала"
    const questionText = document.getElementById("question");
    const userAnswer = document.getElementById("user-answer");
    const checkAnswerButton = document.getElementById("check-answer");
    const hintButton = document.getElementById("hint");
    const correctAnswers = document.getElementById("correct-answers");
    const wrongAnswers = document.getElementById("wrong-answers");
    const hintsUsed = document.getElementById("hints-used");

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Массив чисел
    let firstNumber, secondNumber; // Умножаемые числа
    let correctCount = 0;
    let wrongCount = 0;
    let hintCount = 0;

    function generateQuestion() {
        const selectedNumber = Number(selectNumber.value); // Выбранное число
        firstNumber = selectedNumber; // Обновляем первое число
        secondNumber = numbers[Math.floor(Math.random() * numbers.length)]; // Генерируем второе число

        const question = `Сколько будет ${firstNumber} * ${secondNumber}?`;
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
        restartButton.disabled = false; // Разблокируем кнопку "Начать сначала"
    });

    restartButton.addEventListener("click", function () {
        // Очищаем счет и вопрос
        correctCount = 0;
        wrongCount = 0;
        hintCount = 0;
        updateScore();
        questionText.textContent = "";
        userAnswer.value = "";
        startButton.disabled = false;
        restartButton.disabled = true;
    });

    checkAnswerButton.addEventListener("click", function () {
        const answer = Number(userAnswer.value);
        const correctAnswer = firstNumber * secondNumber;

        if (selectNumber.selectedIndex < 0 || selectNumber.selectedIndex >= numbers.length) {
            alert("Выберите число!");
            return;
        }

        if (!isNaN(answer)) {
            if (answer === correctAnswer) {
                correctCount++;
            } else {
                wrongCount++;
            }
        } else {
            alert("Введите число!");
            return;
        }

        updateScore();
        generateQuestion();
    });

    hintButton.addEventListener("click", function () {
        const correctAnswer = firstNumber * secondNumber;
        hintCount++;
        updateScore();
        alert(`Правильный ответ: ${correctAnswer}`);
    });

    function updateScore() {
        correctAnswers.textContent = correctCount;
        wrongAnswers.textContent = wrongCount;
        hintsUsed.textContent = hintCount;
    }
});