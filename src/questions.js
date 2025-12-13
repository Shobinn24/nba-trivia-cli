// src/questions.js 
/** NBA Trivia Questions */

const nbaQuestions = [
  {
    question: "Who is the best basketball player of all-time?",
    options: ["Kobe", "Jordan", "Lebron"],
    correctAnswer: "Jordan",
  },
  {
    question: "Who is the best Scorer?",
    options: ["Kobe", "Jordan", "Lebron"],
    correctAnswer: "Kobe",
  },
  {
    question: "Who is the best All around player?",
    options: ["Kobe", "Jordan", "Lebron"],
    correctAnswer: "Lebron",
  },
];
// get all questions
// array of question objects
function getQuestions() {
  return nbaQuestions;
}
// get question by index
// index: number
// question object
function getQuestion(index) {
    if (index >= 0 && index < nbaQuestions.length) {
        return nbaQuestions[index];
    }
    return null;
}
// total number of questions
function getTotalQuestions() {
    return nbaQuestions.length;
}
// check answer
function checkAnswer(questionIndex, userAnswer) {
    const question = getQuestion(questionIndex);
    if (!question) {
        return false;
    }
    return question.correctAnswer === userAnswer;
}
// export functions
module.exports = {
  getQuestions,
  getQuestion,
    getTotalQuestions,
    checkAnswer,
};