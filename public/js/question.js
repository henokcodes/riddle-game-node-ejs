class Question {
    constructor(questionText, answers, correctAnswer) {
        this.questionText = questionText;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    checkAnswer(answer){
        return answer === this.correctAnswer;
    }
}


// fetch all questions from the routes.js
let questions = []

fetch('/display_all_questions').then(response => response.json()).then(data =>{
    console.log(data.questions)
    for(let val of data.questions){
        questions.push( new Question( val.text,{
            a:val.choices[0],
            b:val.choices[1],
            c:val.choices[2],
            d:val.choices[3]
        },val.answer))
    }
    
}).catch(err => console.log(err))



