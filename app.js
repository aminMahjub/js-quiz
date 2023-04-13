class Question {
    constructor(question, options, correctAnswer) {
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.userAnswer = null;
        this.isAnswered = false;
    }
}

class Quiz {
    constructor() {
        this.questions = [
            new Question('What do you understand by HTML?', ['HTML describes the structure of a webpage', 'HTML is the standard markup language mainly used to create web pages', 'HTML consists of a set of elements that helps the browser how to view the content', 'All of the above', ], 3),
            new Question('Who is the father of HTML?', ['Rasmus Lerdorf', 'Tim Berners-Lee', 'Brendan Eich', 'Sergey Brin'], 1),
            new Question('HTML stands for ___', ['HyperText Markup Language', 'HighText Markup Language', 'HyperText Marking Language', 'High Marking Language'], 0),
            new Question('Which tag is used for inserting the largest heading in HTML?', ['head', '<h1>', '<h6>', 'heading'], 1),
            new Question('Which is used to read an HTML page and render it?', ['Web server', 'Web network', 'Web browser', 'Web matrix'], 1)
        ];
        this.score = 0;
        this.currentQuestionIndex = 0;
    }

    calculateScore() {
        const everyQuizScore = 100 / this.questions.length;
        this.score += everyQuizScore;
    }
}

class UpdateView {
    constructor(quiz) {
        this.quiz = quiz;
        this.nextPreviousBtns = document.querySelectorAll('.question-next-previuos button');
        this.OptionsContainer = document.querySelector('.options');
        
        this.nextPreviousBtns.forEach(nextPreviousBtn => nextPreviousBtn.addEventListener('click', () => nextPreviousBtn.classList[0] === 'previous-btn' ? 
            this.nextPreviousActions(--this.quiz.currentQuestionIndex) : 
            this.nextPreviousActions(++this.quiz.currentQuestionIndex)
        ));
    }

    renderView(currentQuestionIndex) {
        let questions = this.quiz.questions;
        const { question, options, correctAnswer } = questions[currentQuestionIndex];

        const questionTitle = document.querySelector('.question p'),
            currentNumberQuestion = document.querySelector('.current-number-question'),
            showScore = document.querySelector('.score span');

            
        questionTitle.textContent = question;

        options.forEach((option, i) => {
            const optionBtn = document.createElement('button');
            
            optionBtn.classList.add('option-btn');
            optionBtn.id = `${i}`;
            optionBtn.setAttribute('type', 'button');
            optionBtn.textContent = option;

            optionBtn.addEventListener('click', e => {
                e.preventDefault();

                questions[currentQuestionIndex].userAnswer = +e.target.id;
                questions[currentQuestionIndex].userAnswer === correctAnswer ? this.quiz.calculateScore() : null;
                showScore.textContent = this.quiz.score;

                this.answeredAction({ correctAnswer, userAnswer: questions[currentQuestionIndex].userAnswer });
                questions[currentQuestionIndex].isAnswered = true;
            });
            
            this.OptionsContainer.append(optionBtn);
        });
        
        currentNumberQuestion.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
        
        if (currentQuestionIndex === 0) {
            this.nextPreviousBtns[0].disabled = true;
        } else if (currentQuestionIndex === 4) {
            this.nextPreviousBtns[1].disabled = true;
        } else {
            this.nextPreviousBtns[0].disabled = false;
            this.nextPreviousBtns[1].disabled = false;
        }
    }

    answeredAction(currentQuestion) {
        let { correctAnswer, userAnswer } = currentQuestion;
        const optionBtns = document.querySelectorAll('.options button');    
    
        optionBtns[correctAnswer].classList.add('correct-answer');
        this.OptionsContainer.classList.add('disabled-btns');
        userAnswer !== correctAnswer ? optionBtns[userAnswer].classList.add('wrong-answer') : null;
    }

    nextPreviousActions(currentQuestionIndex) {
        const isAnswered  = this.quiz.questions[currentQuestionIndex].isAnswered; 

        this.OptionsContainer.innerHTML = '';
        this.OptionsContainer.classList.remove('disabled-btns'); 
        this.renderView(currentQuestionIndex);
        isAnswered ? this.answeredAction(this.quiz.questions[currentQuestionIndex]) : null;
    }
}

const quiz = new Quiz();
const app = new UpdateView(quiz);
app.renderView(quiz.currentQuestionIndex);