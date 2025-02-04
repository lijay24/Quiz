document.addEventListener("DOMContentLoaded", () => {
    // Select Elements
    const startBtn = document.querySelector(".start_btn button");
    const infoBox = document.querySelector(".info_box");
    const exitBtn = document.querySelector(".buttons .quit");
    const continueBtn = document.querySelector(".buttons .restart");
    const quizBox = document.querySelector(".quiz_box");


    // Start Quiz - Show Info Box
    startBtn.addEventListener("click", () => {
        infoBox.classList.add("activeInfo");
    });

    // Exit Button - Hide Info Box
    exitBtn.addEventListener("click", () => {
        infoBox.classList.remove("activeInfo");
    });

    // Continue Button - Hide Info Box, Show Quiz Box
continueBtn.addEventListener("click", () => {
    infoBox.classList.remove("activeInfo");  // Hides the Info Box
    quizBox.classList.add("activeQuiz");     // Shows the Quiz Box
});
});
