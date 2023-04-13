class Question {
    constructor(title, choices, correctChoice) {
        this.title = title;
        this.choices = choices;
        this.correctChoice = correctChoice;
        this.yourAnswer = null;
        this.isAnswered = false;
    }
}

class Quiz {
    constructor() {
        this.quizes = [
            new Question('What do you understand by HTML?', ['HTML describes the structure of a webpage', 'HTML is the standard markup language mainly used to create web pages', 'HTML consists of a set of elements that helps the browser how to view the content', 'All of the above', ], 3),
            new Question('Who is the father of HTML?', ['Rasmus Lerdorf', 'Tim Berners-Lee', 'Brendan Eich', 'Sergey Brin'], 1),
            new Question('HTML stands for ___', ['HyperText Markup Language', 'HighText Markup Language', 'HyperText Marking Language', 'High Marking Language'], 0),
            new Question('Which tag is used for inserting the largest heading in HTML?', ['head', '<h1>', '<h6>', 'heading'], 1),
            new Question('Which is used to read an HTML page and render it?', ['Web server', 'Web network', 'Web browser', 'Web matrix'], 0)
        ];
        this.score = 0;
        this.currentQuestionNum = 0;
    }

    calculateScore() {
        const everyQuizScore = 100 / this.quizes.length;
        this.score += everyQuizScore;
    }
}

class UpdateView {
    constructor(quizes) {
        this.quizesArr = quizes;
        this.counterBtns = document.querySelectorAll('.quesiton-counter button');
        this.choicesRoot = document.querySelector('.choices');
        
        this.counterBtns.forEach(counterBtn => counterBtn.addEventListener('click', () => {
            counterBtn.classList[0] === 'previous-btn' ? this.nextPreviousActions(--this.quizesArr.currentQuestionNum) : this.nextPreviousActions(++this.quizesArr.currentQuestionNum);
        }));
    }

    updateUI(currentQuestionNum) {
        const questionTitle = document.querySelector('.question p'),
            currentNumberQuestion = document.querySelector('.current-number-question'),
            currentQuestion = this.quizesArr.quizes[currentQuestionNum],
            score = document.querySelector('.score span');

        let { title, choices, correctChoice, yourAnswer, isAnswered } = currentQuestion;
            
        questionTitle.textContent = title;
            
        choices.forEach((choice, index) => {
            const choiceBtn = document.createElement('button');
            
            choiceBtn.classList.add('choice-btn');
            choiceBtn.id = `${index}`;
            choiceBtn.setAttribute('type', 'button');
            choiceBtn.textContent = choice;
            choiceBtn.addEventListener('click', e => {
                e.stopPropagation();
                currentQuestion.yourAnswer = +e.target.id;
                currentQuestion.yourAnswer === correctChoice ? this.quizesArr.calculateScore() : null;

                this.answeredAction({ correctChoice, yourAnswer: currentQuestion.yourAnswer });
                currentQuestion.isAnswered = true;

                console.log(currentQuestion);
            });
            
            this.choicesRoot.append(choiceBtn);
        });
        
        currentNumberQuestion.textContent = `${currentQuestionNum + 1} / ${this.quizesArr.quizes.length}`;
        score.textContent = this.quizesArr.score;

        // next privous acitions        
        if (this.quizesArr.currentQuestionNum === 0) {
            this.counterBtns[0].disabled = true;
        } else if (this.quizesArr.currentQuestionNum === 4) {
            this.counterBtns[1].disabled = true;
        } else {
            this.counterBtns[0].disabled = false;
            this.counterBtns[1].disabled = false;
        }
    }

    answeredAction(currentQuestion) {
        let { correctChoice, yourAnswer } = currentQuestion;
        const choiceBtnsArr = document.querySelectorAll('.choices button');    
    
        choiceBtnsArr[correctChoice].classList.add('correct-answer');
        this.choicesRoot.classList.add('disabled-btns');
        yourAnswer !== correctChoice ? choiceBtnsArr[yourAnswer].classList.add('wrong-answer') : null;
    }

    nextPreviousActions(currentQuestionState) {
        let { isAnswered } = this.quizesArr.quizes[currentQuestionState]; 
        this.choicesRoot.innerHTML = '';
        this.choicesRoot.classList.remove('disabled-btns'); 
        this.updateUI(currentQuestionState);
        isAnswered ? this.answeredAction(this.quizesArr.quizes[currentQuestionState]) : null;
    }
}

const quiz = new Quiz();
const app = new UpdateView(quiz);
app.updateUI(quiz.currentQuestionNum);