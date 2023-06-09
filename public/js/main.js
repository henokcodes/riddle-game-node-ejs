let quiz =new Quiz(questions);


const gLevel = document.getElementById('level');

gLevel.addEventListener('change', (event) => {
  const selectedValue = event.target.value;
  console.log('Selected value:', selectedValue);
  $.ajax('/post_level',{
    type: 'post',
    data: {
        level: selectedValue
     }
  }).done((res)=>{
    questions = [];
    for(let val of res.questions){
        questions.push( new Question( val.text,{
            a:val.choices[0],
            b:val.choices[1],
            c:val.choices[2],
            d:val.choices[3]
        },val.answer))
    }
    const randomQuestions =  questions.sort(() => Math.random() - 0.5).slice(0, 5); 
    quiz = new Quiz(randomQuestions);
  }).fail(function(){
    console.log("error setting level")
  })
//   console.log('Selected value:', selectedValue);
  // Do something with the selected value
});

const highScore = [];
// Start Button event
$(".btn-start").click(() => {
    $(".quiz-box").addClass("active"); //adds active
    showQuestion(quiz.callQuestion());
    showNumber(quiz.questionIndex + 1, quiz.questions.length);
    startTimer(10);
    startLine();
    $('.difficulty').text($('#level').val())
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
    music_stop(); 
})
$('#sound_on').click(()=>{
     audio.play() 
})

// // Get the selected level element
// var levelElement = document.querySelector('select[name="level"]');

// // Get the selected value
// var selectedLevel = levelElement.value;

// // Print the selected value
// console.log(selectedLevel);


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

window.onload = ()=>{
    updatehscore();
    updateleaderboard();

    const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user_name="))
    ?.split("=")[1];
    if(cookieValue)
    $('.loggeduser').text("Welcome, " +cookieValue)

    $.ajax('/post_level',{
        type: 'post',
        data: {
            level: "easy"
         }
      }).done((res)=>{
        questions = [];
        for(let val of res.questions){
            questions.push( new Question( val.text,{
                a:val.choices[0],
                b:val.choices[1],
                c:val.choices[2],
                d:val.choices[3]
            },val.answer))
        }
        const randomQuestions =  questions.sort(() => Math.random() - 0.5).slice(0, 5); 
         quiz = new Quiz(randomQuestions);
    
      }).fail(function(){
        console.log("error setting level")
      })
}

setInterval(updateleaderboard, 10000 );
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
        quiz.correctAnswers = 0;
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
    $(".score-box").removeClass("active");
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
        if($('.difficulty').text()=="easy")
        quiz.correctAnswers++;
        else if($('.difficulty').text()=="medium")
        quiz.correctAnswers+=2;
        else if($('.difficulty').text()=="hard")
        quiz.correctAnswers+=3;
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", incorrectIcon);
    }
    // allQuestions

    for (let i = 0; i < option_list.children.length; i++) {
        option_list.children[i].classList.add("disabled");
    }
}

// Function for Show Number of Questions
function showNumber(questionNumber, allQuestions) {
    let tag = `<span>${questionNumber} / ${allQuestions}</span>`;
    $(".badge").html(tag);
}

function updatehscore(){
    let list =  $('.highscore-box section');
    list.empty();
    let p = '';

   
    const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user_name="))
    ?.split("=")[1];
    $.ajax('/gethighscore', {
        type:'post',
        data: {
            username: cookieValue
        } 
    }).done(function(res){
        for(let object of res){
            if(object!=undefined && parseInt(object.score)>0)
          p+='<p><strong class="timestamp">'+ object.timestamp+ '</strong> : <strong class="sco">'+ object.score +'</strong></p><hr/>';
        }
        list.append(p);
         
    }).fail(function(){
        console.log("error")
    }) 
}
//leaderboard
function updateleaderboard(){
    let i=1;
    let list =  $('.leaderboard-box section');
    let blink =  $('.blink');
    let p = '';
    list.empty();
    blink.empty();
    $.ajax('/getallscore', {
        type:'post'
    }).done(function(res){
       let span =  'Top Scorer: <span id="name">' + res[0].username + '</span> - <span id="score">'+ res[0].score.score+'</span> ';
        for(let object of res){
          p+='<p>'+ i +'. <strong class="timestamp">'+ object.username+ '</strong> : <strong class="sco">'+ object.score.score +'</strong> : <strong class="sco">'+ object.score.timestamp +'</strong></p><hr/>';
            i++;
        }
        blink.append(span);
        list.append(p);
          
    }).fail(function(){
        console.log("error")
    }) 
}
// Function for Show Score
function showScore(correctAnswers, allQuestions) {
    const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user_name="))
    ?.split("=")[1];
        $.ajax('/updatescore', {
            type:'post',
            data: {
                username: cookieValue,
                score: correctAnswers
            } 
        }).done(function(res){
            // console.log(res)
            
        }).fail(function(){
            console.log("error")
        })
    
    
    let tag = `You have got ${correctAnswers} points out of ${allQuestions} questions`;
    $(".score-text").html(tag);

    updatehscore();
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

function addQuestion(){

    $.ajax('/questions',{
        type: 'post',
        data: {
            text: $('#qtext').val(), 
            choices: $('#qchoices').val(),
            answer: $('#qanswer').val(), 
            difficulty: $('qdifficulty').val()
         }
      }).done((res)=>{
        console.log("Success")
      }).fail(function(){
        console.log("error setting level")
      })
}