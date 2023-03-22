const quiz = new Quiz(questions);

const highScore = [];
// Start Button event
$(".btn-start").click(() => {
    $(".quiz-box").addClass("active"); //adds active
    showQuestion(quiz.callQuestion());
    showNumber(quiz.questionIndex + 1, quiz.questions.length);
    startTimer(10);
    startLine();
});

`use strict`;
function refreshTime() {
  const timeDisplay = $("#time");
  const dateString = new Date().toLocaleString();
  const formattedString = dateString.replace(", ", " - ");
  timeDisplay.text(formattedString);
  timeDisplay.css("color","white");
 
}
  setInterval(refreshTime, 1000);

//   `use strict`;
// function refreshScore() {
//   const topScorer = $("#name");
//   const topScore = $("#score");
//   topScorer.text(formattedString);
//   topScore.text(formattedString);
 
// }
//   setInterval(refreshScore, 1000);

let audio = document.querySelector('.musicOn audio');
$('#sound_off').click(()=>{
    audio.paused ? audio.play() : music_stop(); 
})
$('#sound_on').click(()=>{
    audio.paused ? audio.play() : music_stop(); 
})
// on_off.onclick = function() {
//   audio.paused ? audio.play() : music_stop();
// }
$('.oback').click(()=>{
    if($('.option-box').hasClass('active')){
        $('.option-box').removeClass('active')
    } else {
        $('.option-box').addClass('active')
    }   
})

$('.highscore').click(()=>{
    if($('.highscore-box').hasClass('active')){
        $('.highscore-box').removeClass('active')
    } else {
        $('.highscore-box').addClass('active')
    }   
})

$('.leaderboard').click(()=>{
    if($('.leaderboard-box').hasClass('active')){
        $('.leaderboard-box').removeClass('active')
    } else {
        $('.leaderboard-box').addClass('active')
    }   
})


function music_stop() {
  audio.pause();
  audio.currentTime = 0;
}

// Next Button event
$(".next").click( () => {
    if (quiz.questions.length > quiz.questionIndex + 1) {
        $(".quiz-box").addClass("active");
        clearInterval(counter);
        startTimer(10);
        clearInterval(counterLine);
        startLine();
        quiz.questionIndex++;
        showQuestion(quiz.callQuestion());
        showNumber(quiz.questionIndex + 1, quiz.questions.length);
    } else {
        console.log("The End");
        clearInterval(counter);
        clearInterval(counterLine);
        $(".quiz-box").removeClass("active");
        $(".score-box").addClass("active");
        showScore(quiz.correctAnswers, quiz.questions.length);
    }
});

// Replay Button event
$(".replay-btn").click( () => {
    quiz.questionIndex = 0;
    quiz.correctAnswers = 0;
    $(".btn-start").click();
    $(".score-box").removeClass("active");
});

// Quit Button event
$(".quit-btn").click( () => {
    window.location.reload();
});

const option_list = document.querySelector(".option-list");
const correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>';
const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>';

//Function for Show Questions 
function showQuestion(question) {
    let question_text = `<span> ${question.questionText} </span> `;
    let options = '';

    for (let answer in question.answers) {
        options +=
            `
            <div class="option">
                <span><b>${answer}</b>: ${question.answers[answer]}</span>
            </div>
        `;
    }

    $(".question-text").html( question_text);
    option_list.innerHTML = options;

    const option = option_list.querySelectorAll(".option");

    for (opt of option) {
        opt.setAttribute("onclick", "optionSelected(this)");
    }
}

// Function for Options
function optionSelected(option) {
    clearInterval(counter);
    clearInterval(counterLine);
    let answer = option.querySelector("span b").textContent;
    let question = quiz.callQuestion();

    if (question.checkAnswer(answer)) {
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", correctIcon);
        quiz.correctAnswers++;
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", incorrectIcon);
    }allQuestions

    for (let i = 0; i < option_list.children.length; i++) {
        option_list.children[i].classList.add("disabled");
    }
}

// Function for Show Number of Questions
function showNumber(questionNumber, allQuestions) {
    let tag = `<span>${questionNumber} / ${allQuestions}</span>`;
    $(".badge").html(tag);
}

// Function for Show Score
function showScore(correctAnswers, allQuestions) {
    let tag = `You have ${correctAnswers} correct answers out of ${allQuestions}`;
    $(".score-text").html(tag);
   
}

// Timer 
let counter;

function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        $(".second").text(time);
        time--;

        if (time < 0) {
            clearInterval(counter);

            $(".time-text").text("Time Over");

            let answer = quiz.callQuestion().correctAnswer;

            for (let option of option_list.children) {
                if (option.querySelector("span b").textContent == answer) {
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", correctIcon);
                }
                option.classList.add("disabled");
            }
        }
    }

}


// Time Line
let counterLine;

function startLine() {
    counterLine = setInterval(timer, 20);
    let lineWidth = 0;

    function timer() {
        document.querySelector(".time-line").style.width = lineWidth + "%";
        lineWidth += 0.181;

        if (lineWidth > 100.1) {
            clearInterval(counterLine);
        }
    }
}