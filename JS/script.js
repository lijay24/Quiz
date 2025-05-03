// Select Elements
const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const exitBtn = document.querySelector(".buttons .quit");
const continueBtn = document.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option-list");
const timeCount = quizBox.querySelector(".timer .time_sec");
const timeLine = quizBox.querySelector("header .time_line");
const next_btn = quizBox.querySelector(".next-btn");
const result_box = document.querySelector(".result-box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// Quiz Variables
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let isAnswerSelected = false;

// Icons
const tickicon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
const crossicon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// Event Listeners
startBtn.onclick = () => infoBox.classList.add("activeInfo");
exitBtn.onclick = () => infoBox.classList.remove("activeInfo");

continueBtn.onclick = () => {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(timeValue);
    startTimerLine(0);
};

next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        isAnswerSelected = false;
        showQuestions(que_count);
        queCounter(que_numb);
        startTimer(timeValue);
        startTimerLine(0);
        next_btn.style.display = "none";
    } else {
        showResultBox();
    }
};

// Quiz Functions
function showQuestions(index) {
    clearInterval(counter);
    clearInterval(counterLine);
    
    const que_text = document.querySelector(".que-text");
    let que_tag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
    let option_tag = questions[index].Options.map(option => 
        `<div class="option">${option}<span></span></div>`
    ).join('');
    
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    
    const options = option_list.querySelectorAll(".option");
    options.forEach(option => {
        option.setAttribute("onclick", "optionSelected(this)");
    });
    
    timeValue = 15;
    widthValue = 0;
    startTimer(timeValue);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
}

function optionSelected(answer) {
    if (isAnswerSelected) return;
    isAnswerSelected = true;
    
    clearInterval(counter);
    clearInterval(counterLine);
    
    let userAns = answer.textContent.trim().toLowerCase();
    let correctAns = questions[que_count].answer.trim().toLowerCase();
    
    const allOptions = option_list.querySelectorAll(".option");
    allOptions.forEach(opt => {
        opt.classList.add("disabled");
        opt.style.pointerEvents = "none";
    });
    
    next_btn.style.display = "block";

    if (userAns === correctAns) {
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickicon);
        userScore++;
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossicon);
        
        allOptions.forEach(opt => {
            if (opt.textContent.trim().toLowerCase() === correctAns) {
                opt.classList.add("correct");
                opt.insertAdjacentHTML("beforeend", tickicon);
            }
        });
    }
}

// Timer Functions
function startTimer(time) {
    clearInterval(counter);
    timeCount.textContent = time < 10 ? `0${time}` : time;
    
    counter = setInterval(() => {
        timeCount.textContent = time < 10 ? `0${time}` : time;
        time--;
        
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            
            if (!isAnswerSelected) {
                const allOptions = option_list.querySelectorAll(".option");
                allOptions.forEach(opt => {
                    opt.classList.add("disabled");
                    opt.style.pointerEvents = "none";
                });
                
                if (que_count < questions.length - 1) {
                    setTimeout(() => {
                        next_btn.click();
                    }, 1000);
                } else {
                    showResultBox();
                }
            }
        }
    }, 1000);
}

function startTimerLine(time) {
    clearInterval(counterLine);
    timeLine.style.width = "0";
    
    counterLine = setInterval(() => {
        time += 1;
        timeLine.style.width = `${time}px`;
        
        if (time > 549 || isAnswerSelected) {
            clearInterval(counterLine);
        }
    }, 29);
}

// Result Functions
function showResultBox() {
    clearInterval(counter);
    clearInterval(counterLine);
    
    quizBox.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    
    const scoreText = result_box.querySelector(".score-text");
    const percentage = Math.round((userScore / questions.length) * 100);
    
    if (percentage >= 50) {
        scoreText.innerHTML = `
            <span class="congrats">Congratulations! 🎉</span><br>
            You scored ${userScore} out of ${questions.length}<br>
            (${percentage}% - You passed!)
        `;
    } else {
        scoreText.innerHTML = `
            <span class="oops">Keep Practicing! 📚</span><br>
            You scored ${userScore} out of ${questions.length}<br>
            (${percentage}% - Try again!)
        `;
    }
}

// Utility Functions
function queCounter(index) {
    const bottom_que_counter = quizBox.querySelector(".total-que");
    bottom_que_counter.innerHTML = `<span><p>${index}</p> of <p>${questions.length}</p> Questions</span>`;
}

restart_quiz.onclick = () => {
    result_box.classList.remove("activeResult");
    quizBox.classList.add("activeQuiz");
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    isAnswerSelected = false;
    showQuestions(0);
    queCounter(1);
    startTimer(timeValue);
    startTimerLine(0);
};

quit_quiz.onclick = () => window.location.reload();