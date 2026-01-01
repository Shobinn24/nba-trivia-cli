NBA Trivia CLI Game
A comprehensive command-line trivia game testing knowledge of NBA legends, built with JavaScript and Node.js. Features extensive test coverage with 71 test cases using Jest.

Features

Interactive CLI Interface - Engaging command-line experience with real-time user interaction
Real-Time Feedback - Immediate response validation with correct answer display
Score Tracking - Persistent score tracking throughout gameplay
Performance Evaluation - Final score analysis with personalized feedback
Timed Questions - Built-in timer for added challenge
Replay Functionality - Play again option without restarting the application
Input Validation - Robust error handling and input sanitization
Comprehensive Testing - 71 Jest test cases ensuring code reliability

Technologies Used

Node.js - JavaScript runtime environment
Readline - Built-in Node.js module for command-line input/output
Jest - JavaScript testing framework for unit and integration tests
Async/Await - Modern asynchronous JavaScript patterns
Modular Architecture - Separation of concerns with organized file structure

Installation
Prerequisites

Node.js (v14 or higher)
npm (Node Package Manager

Setup

Clone the repository: git clone https://github.com/Shobinn24/nba-trivia-cli.git
Navigate to the project directory: cd nba-trivia-cli
Install dependencies: npm install

Usage

Start the game: npm start or node index.js
Run tests: npm test or Run test with coverage: npm run test:coverage

Testing
This project includes comprehensive test coverage with 71 test cases covering:

✅ Input validation and sanitization
✅ Score calculation and tracking
✅ Question randomization logic
✅ Timer functionality
✅ User interaction flows
✅ Error handling
✅ Game state management
✅ Edge cases and boundary conditions

Test Framework: Jest
Test Coverage: Unit tests, integration tests, and edge case scenarios

Project Structure
nba-trivia-cli/
├── index.js              # Main entry point
├── game.js               # Core game logic
├── questions.js          # Question bank and data
├── utils.js              # Helper functions
├── __tests__/            # Test suite
│   ├── game.test.js
│   ├── questions.test.js
│   └── utils.test.js
├── package.json
└── README.md

How to Play

Start the game using npm start
Read each trivia question carefully
Enter your answer when prompted
Receive immediate feedback (correct/incorrect)
View your final score and performance evaluation
Choose to play again or exit

Key Learning Outcomes
Through building this project, I developed skills in:

Test-Driven Development (TDD) - Writing tests before implementation
Asynchronous Programming - Handling async operations with Promises and async/await
Modular Design - Creating maintainable, reusable code components
Input Validation - Implementing robust error handling
CLI Development - Building interactive command-line applications
Version Control - Git workflow and repository management

Future Enhancements

 Add difficulty levels (Easy, Medium, Hard)
 Implement a leaderboard system
 Integrate external NBA API for current stats
 Add multiplayer functionality
 Create a web-based GUI version
 Add more question categories (current players, teams, championships)

 Author
Shobinn Clark

GitHub: @Shobinn24
LinkedIn:https://www.linkedin.com/in/shobinn-clark-27722a85/
