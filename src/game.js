// Game Logic
// Handles game flow, scoring and feedback with timed questions

const { getQuestions, getTotalQuestions, checkAnswer } = require('./questions');

// Game state
let currentScore = 0;
let currentQuestionIndex = 0;
let gameActive = false;
let currentTimer = null;
let timeRemaining = 0;

// Timer duration in seconds
const QUESTION_TIME_LIMIT = 15; // 15 seconds per question

// initialize game
function startGame() {
    currentScore = 0;
    currentQuestionIndex = 0;
    gameActive = true;
    console.log("Welcome to NBA Trivia!");
    console.log('Test your knowledge about NBA legends.');
    console.log(`You have ${QUESTION_TIME_LIMIT} seconds per question!`);
    console.log('='.repeat(50));
}

// get current question
function getCurrentQuestion() {
    const questions = getQuestions();
    if (currentQuestionIndex < questions.length) {
        return questions[currentQuestionIndex];
    }
    return null;
}

// display question and options
function displayQuestion(question) {
    if (!question) {
        console.log("No more questions available.");
        return;
    }
    console.log(`Question ${currentQuestionIndex + 1} of ${getTotalQuestions()}:`);
    console.log(question.question);
    console.log("Options:");
    question.options.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
    });
    console.log(' ');
}

// Start timer for question
function startQuestionTimer(onTimeout) {
    // Clear any existing timer
    if (currentTimer) {
        clearInterval(currentTimer);
    }
    timeRemaining = QUESTION_TIME_LIMIT;
    console.log(`You have ${timeRemaining} seconds remaining`);

    currentTimer = setInterval(() => {
        timeRemaining--;


        if (timeRemaining > 0) {
            // Update remaining time
            if (timeRemaining === 10) {
                console.log(`Timer: ${timeRemaining} seconds remaining! Hurry up!`); 
            } else if (timeRemaining === 5) {
                console.log(`Timer: ${timeRemaining} seconds remaining`);    
            } else if (timeRemaining === 3 || timeRemaining === 2 || timeRemaining === 1) {
                console.log(`${timeRemaining}...`);
            }
        } else {
            // Time's up
            clearInterval(currentTimer);
            currentTimer = null;
            console.log('\nTime is up!');
            if (onTimeout) {
                onTimeout();
            }
        }
    }, 1000);
    
return {
    stop: () => {
        if (currentTimer) {
            clearInterval(currentTimer);
            currentTimer = null;
        }
    }  
};
}
// stop question timer
function stopQuestionTimer() {
    if (currentTimer) {
        clearInterval(currentTimer);
        currentTimer = null;
    }
}
// get remaining time
function getTimeRemaining() {
    return timeRemaining;
}

// process user answer
function submitAnswer(userAnswer) {
    const isCorrect = checkAnswer(currentQuestionIndex, userAnswer);
    const question = getCurrentQuestion();

    let feedback = '';
    if (isCorrect) {
        currentScore++;
        feedback = `Correct! ${userAnswer} is the right answer.`;
    } else {
        feedback = `Incorrect. The correct answer was ${question.correctAnswer}.`;
    }
    console.log('\n' + feedback);
    console.log(`Current Score: ${currentScore}/${currentQuestionIndex + 1}`);
    console.log('='.repeat(50));

    return {
        isCorrect,
        feedback,
        correctAnswer: question.correctAnswer
    };
}
// Handle timeout for question
function handleTimeout() {
    const question = getCurrentQuestion();
    console.log(`The correct answer was ${question.correctAnswer}.`);
    console.log(`Current Score: ${currentScore}/${currentQuestionIndex + 1}`);
    console.log('='.repeat(50));
    
    return {
        isCorrect: false,
        feedback: 'Time expired',
        correctAnswer: question.correctAnswer,
        timedOut: true
    };
}


// move to next question
function nextQuestion() {
    currentQuestionIndex++;
    return currentQuestionIndex < getTotalQuestions();
}

// check if game is over
function isGameOver() {
    return currentQuestionIndex >= getTotalQuestions();
}

// end game and show final score
function endGame() {
    // stop any running timer
    stopQuestionTimer();

    gameActive = false;
    const totalQuestions = getTotalQuestions();
    const percentage = Math.round((currentScore / totalQuestions) * 100);
    
    console.log('='.repeat(50));
    console.log("Game Over!");
    console.log(`Your final score: ${currentScore}/${totalQuestions} (${percentage}%)`);
    console.log('Thank you for playing NBA Trivia!');

    // performance feedback
    let performanceFeedback = '';
    if (percentage === 100) {
        performanceFeedback = "Outstanding! You're an NBA genius!";
    } else if (percentage >= 80) {
        performanceFeedback = "Great job! You really know your NBA history.";
    } else if (percentage >= 50) {
        performanceFeedback = "Good effort! A bit more studying and you'll improve.";
    } else {
        performanceFeedback = "Keep trying! The NBA world has much to offer.";
    }
    console.log(performanceFeedback);

    return {
        score: currentScore,
        totalQuestions,
        percentage
    };
}

// get game state
function getGameState() {
    return {
        score: currentScore,
        currentQuestion: currentQuestionIndex + 1,
        totalQuestions: getTotalQuestions(),
        isActive: gameActive,
        timeRemaining: timeRemaining
    };
}

// reset game
function resetGame() {
    currentScore = 0;
    currentQuestionIndex = 0;
    gameActive = false;
    timeRemaining = 0;
}

// export game functions
module.exports = {
    startGame,
    getCurrentQuestion,
    displayQuestion,
    submitAnswer,
    nextQuestion,
    isGameOver,
    endGame,
    getGameState,
    resetGame,
    startQuestionTimer,
    stopQuestionTimer,
    handleTimeout,
    getTimeRemaining,
    QUESTION_TIME_LIMIT
};
