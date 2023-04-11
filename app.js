class Question {
    constructor(title, choices, correctChoice) {
        this.title = title;
        this.choices = choices;
        this.correctChoice = correctChoice;
        this.isAnswered = false;
    }
}

class Quiz {
    constructor() {
        this.quizes = [
            new Question('What do you understand by HTML?', ['HTML describes the structure of a webpage', 'HTML is the standard markup language mainly used to create web pages', 'HTML consists of a set of elements that helps the browser how to view the content', 'All of the above', ], 3),
            new Question('Who is the father of HTML?', ['Rasmus Lerdorf', 'Tim Berners-Lee', 'Brendan Eich', 'Sergey Brin'], 1),
            new Question('HTML stands for ___', ['HyperText Markup Language', 'HyperText Markup Language', 'HyperText Marking Language', 'HighText Marking Language'], 0),
            new Question('Which tag is used for inserting the largest heading in HTML?', ['head', '<h1>', '<h6>', 'heading'], 2),
            new Question('Which is used to read an HTML page and render it?', ['Web server', 'Web network', 'Web browser', 'Web matrix'], 0)
        ];
        this.score = 0;
        this.currentQuestionNum = 0;
    }

    checkAnswer(e ,correctChoice) {
        const clickedChoiceBtnId = +e.target.id;
        const quizStatus = clickedChoiceBtnId === correctChoice ?  true : false;
        quizStatus ? this.calculateScore() : null;

        return quizStatus;
    }

    calculateScore() {
        const everyQuizScore = 100 / this.quizes.length;
        this.score += everyQuizScore;
    }
}

class UpdateView {
    constructor(quizes) {
        this.quizesArr = quizes;
    }

    updateUI() {
        const questionTitle = document.querySelector('.question p'),
            choicesRoot = document.querySelector('.choices'),
            currentNumberQuestion = document.querySelector('.current-number-question'),
            currentQuestion = this.quizesArr.quizes[this.quizesArr.currentQuestionNum];  
        let { title, choices, correctChoice, isAnswered } = currentQuestion;
            
        questionTitle.textContent = title;
            
        choices.forEach((choice, index) => {
            const choiceBtn = document.createElement('button');

            choiceBtn.classList.add('choice-btn');
            choiceBtn.id = `${index}`;
            choiceBtn.setAttribute('type', 'button');
            choiceBtn.textContent = choice;
            choiceBtn.addEventListener('click', e => {
                const choiceBtnsArr = document.querySelectorAll('.choices button');    
                isAnswered = this.quizesArr.checkAnswer(e, correctChoice);

                !isAnswered ? e.target.classList.add('wrong-answer') : null;
                choiceBtnsArr[correctChoice].classList.add('correct-answer');
                choicesRoot.classList.add('disabled-btns');

                
                // render the view for next question
                const timeOutQuiz = setTimeout(() => {
                        choicesRoot.innerHTML = '';
                        choicesRoot.classList.remove('disabled-btns');
                        this.quizesArr.currentQuestionNum++;
                        this.updateUI();
                }, 2000);

                if (this.quizesArr.currentQuestionNum === this.quizesArr.quizes.length - 1) {
                    clearTimeout(timeOutQuiz);
                    this.endQuiz();
                }
            });

            choicesRoot.append(choiceBtn);
        });

        currentNumberQuestion.textContent = `${this.quizesArr.currentQuestionNum + 1} / ${this.quizesArr.quizes.length}`;
    }

    endQuiz() {
        const root = document.querySelector('main');
        root.setAttribute('arial-score', `Your Final Score ${this.quizesArr.score}%`);
        root.classList.add('end-game');
    }
}

const app = new UpdateView(new Quiz());
app.updateUI();