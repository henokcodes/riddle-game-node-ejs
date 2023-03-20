class Quiz {
    constructor(questions){
        this.questions = questions;
        this.questionIndex = 0;
        this.correctAnswers = 0;
    }

    callQuestion(){
        return this.questions[this.questionIndex];
    }
}