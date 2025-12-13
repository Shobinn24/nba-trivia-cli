// User Input Handling Module

const readline = require('readline');
// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ask question and get user input
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}
// get user answer for current question
async function getUserAnswer(question) {
    let validAnswer = false;
    let selectedAnswer = '';

    while (!validAnswer) {
        const input = await askQuestion('Enter your choice (1, 2, or 3): ');
// convert input
const choice = parseInt(input);
// validate input
if (choice >= 1 && choice <= 3) {
    selectedAnswer = question.options[choice - 1];
    validAnswer = true;
} else {
    console.log('Invalid choice. Please select 1, 2, or 3.');
}
    }
    return selectedAnswer;
}
// ask to play again
async function askPlayAgain() {
    const answer = await askQuestion('Do you want to play again? (yes/no): ');
    const normalized = answer.toLowerCase();
    return normalized === 'yes' || normalized === 'y'; 
}
// close readline interface
function closeInput() {
    rl.close();
}
// wait for user to press Enter to continue
async function pressEnterToContinue() {
    await askQuestion('Press Enter to continue...');
}

module.exports = {
    askQuestion,
    getUserAnswer,
    askPlayAgain,
    closeInput,
    pressEnterToContinue,
};