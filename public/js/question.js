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

let questions = [
    
    new Question("Which word is used universally ?",{
        a:"Hi",
        b:"Hello",
        c:"Amien",
    },"b"),
//     new Question("The first two letters signify a male, the first three letters signify a female, the first four letters signify a great, while the entire world signifies a great woman. What is the word?",{
//         a:"Heroin",
//         b:"Heroine",
//         c:"Herroien",
//     },"b"),
    
//     new Question("What is the largest organ in the body?",{
//         a:"Intestine",
//         b:"Lung",
//         c:"Skin",
//     },"c"),
    
//    new Question("What is the strongest muscle in the body?",{
//         a:"Tongue",
//         b:"Masseter",
//         C:"Quadriceps",
//     },"b"),
    
//    new Question("What ancient invention allows people to see through walls?",{
//         a: "Telescope",
//         b:"Magnifying mirrors/glasses",
//         c:"Windows",
//     },"c"),
    
//    new Question("when I get multiplied by any number, the sum the of the figures in the product is always me. What am I?",{
//         a:"5",
//         b:"7",
//         c:"9"
//     },"c"),
    
//    new Question("I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",{
//         a:"A ghost",
//         b:"An echo",
//         c:"A whistle"
//     },"b"),
    
//    new Question("What did the triangle say to the circle?",{
//         a:"You are pointless",
//         b:"You are oval",
//         c:"You are round",
//     },"a"),
    
//     new Question("Only one color, but not one size, Stuck at the bottom, yet easily flies. Present in sun, but not in rain, Doing no harm and feeling no pain. What is it?",{
//         a:"Mirage",
//         b:"Shadow",
//         c:"Moon",
//     },'b'),
    
//     new Question("If eleven plus two equals one, what does nine plus five equal?",{
//         a:"3",
//         b:"1",
//         c:"2",
//     },"c"),
    
//     new Question("Which one is believed to be the origin of coffee?",{
//         a:"Colombia",
//         b:"Middle East",
//         c:"Abyssinia"
//     },"c"),
    
//     new Question("Who created the number zero?",{
//         a:"Egyptians",
//         b:"Greeks",
//         c:"Indians"
//     },"c"),
    
//     new Question("Who is that with a neck and no head, two arms and no hands? What is it?",{
//         a:"A vest",
//         b:"A dress",
//         c:"A shirt"
//     },"c"),
    
    new Question("I am something people celebrate or resist. I change people thoughts and lives.I am obvious to some people but, to others, I am a mystery. What am I?",{
        a:"Time",
        b:"Ideas",
        c:"Age",
    
    },"c"),
    new Question(" Which festival is called the fiestival of light",{
        a:"Holi",
        b:"Diwali",
        c:"Durga Puja"
    },"b")
];