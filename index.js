// Main Entry Point - NBA Trivia CLI Game With Timer
// This file orchestrates the entire game flow with timed questions

const game = require('./src/game');
const input = require('./src/input');

 // Main game loop with timer

async function playGame() {
  // Start the game
  game.startGame();

  // Loop through all questions
  while (!game.isGameOver()) {
    // Get and display current question
    const question = game.getCurrentQuestion();
    game.displayQuestion(question);

    let timedOut = false;
    let userAnswer = null;

    // Create a promise that resolves when timer expires
    const timeoutPromise = new Promise((resolve) => {
      game.startQuestionTimer(() => {
        timedOut = true;
        game.handleTimeout();
        resolve(null);
      });
    });

    // Create a promise for user input
    const inputPromise = input.getUserAnswer(question);

    // Race between timeout and user input
    userAnswer = await Promise.race([inputPromise, timeoutPromise]);

    // Stop the timer
    game.stopQuestionTimer();

    // If we got an answer (not timed out), submit it
    if (userAnswer && !timedOut) {
      game.submitAnswer(userAnswer);
    }

    // Move to next question if not game over
    if (!game.isGameOver()) {
      game.nextQuestion();
    }
  }

  // End game and show final results
  game.endGame();

  // Ask if user wants to play again
  const playAgain = await input.askPlayAgain();

  if (playAgain) {
    console.log('\n');
    game.resetGame();
    await playGame();
  } else {
    console.log('\nThanks for playing! See you next time!\n');
    input.closeInput();
  }
}
// Start the application

async function main() {
  try {
    await playGame();
  } catch (error) {
    console.error('An error occurred:', error);
    input.closeInput();
    process.exit(1);
  }
}

// Run the game
main();