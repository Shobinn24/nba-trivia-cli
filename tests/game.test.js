// Tests for game logic
const game = require('../src/game');

describe('Game Logic Module', () => {
  
  // Reset game before each test
  beforeEach(() => {
    game.resetGame();
  });

  describe('startGame()', () => {
    test('should initialize game state', () => {
      game.startGame();
      const state = game.getGameState();
      
      expect(state.score).toBe(0);
      expect(state.currentQuestion).toBe(1);
      expect(state.isActive).toBe(true);
    });

    test('should reset score to 0', () => {
      // Simulate playing a game
      game.startGame();
      game.submitAnswer('Jordan');
      game.nextQuestion();
      
      // Start new game
      game.startGame();
      const state = game.getGameState();
      
      expect(state.score).toBe(0);
    });
  });

  describe('getCurrentQuestion()', () => {
    test('should return first question at start', () => {
      game.startGame();
      const question = game.getCurrentQuestion();
      
      expect(question).toBeTruthy();
      expect(question.question).toBe('Who is the best basketball player of all-time?');
    });

    test('should return null after all questions are answered', () => {
      game.startGame();
      
      // Answer all 3 questions
      game.submitAnswer('Jordan');
      game.nextQuestion();
      game.submitAnswer('Kobe');
      game.nextQuestion();
      game.submitAnswer('Lebron');
      game.nextQuestion();
      
      const question = game.getCurrentQuestion();
      expect(question).toBeNull();
    });
  });

  describe('submitAnswer(userAnswer)', () => {
    beforeEach(() => {
      game.startGame();
    });

    test('should return correct result for correct answer', () => {
      const result = game.submitAnswer('Jordan');
      
      expect(result.isCorrect).toBe(true);
      expect(result.correctAnswer).toBe('Jordan');
    });

    test('should return correct result for incorrect answer', () => {
      const result = game.submitAnswer('Kobe');
      
      expect(result.isCorrect).toBe(false);
      expect(result.correctAnswer).toBe('Jordan');
    });

    test('should increment score for correct answer', () => {
      game.submitAnswer('Jordan');
      const state = game.getGameState();
      
      expect(state.score).toBe(1);
    });

    test('should not increment score for incorrect answer', () => {
      game.submitAnswer('Kobe'); // Wrong answer for question 1
      const state = game.getGameState();
      
      expect(state.score).toBe(0);
    });

    test('should include feedback in result', () => {
      const result = game.submitAnswer('Jordan');
      
      expect(result.feedback).toBeTruthy();
      expect(typeof result.feedback).toBe('string');
    });
  });

  describe('nextQuestion()', () => {
    beforeEach(() => {
      game.startGame();
    });

    test('should return true when more questions remain', () => {
      const hasMore = game.nextQuestion();
      expect(hasMore).toBe(true);
    });

    test('should return false when no more questions remain', () => {
      game.nextQuestion(); // Move to question 2
      game.nextQuestion(); // Move to question 3
      const hasMore = game.nextQuestion(); // Try to move past last question
      
      expect(hasMore).toBe(false);
    });

    test('should advance to next question', () => {
      const q1 = game.getCurrentQuestion();
      game.nextQuestion();
      const q2 = game.getCurrentQuestion();
      
      expect(q1.question).not.toBe(q2.question);
    });
  });

  describe('isGameOver()', () => {
    beforeEach(() => {
      game.startGame();
    });

    test('should return false at start of game', () => {
      expect(game.isGameOver()).toBe(false);
    });

    test('should return false after first question', () => {
      game.nextQuestion();
      expect(game.isGameOver()).toBe(false);
    });

    test('should return true after all questions are answered', () => {
      game.nextQuestion(); // Question 2
      game.nextQuestion(); // Question 3
      game.nextQuestion(); // Past last question
      
      expect(game.isGameOver()).toBe(true);
    });
  });

  describe('endGame()', () => {
    beforeEach(() => {
      game.startGame();
    });

    test('should return final stats', () => {
      // Answer all questions correctly
      game.submitAnswer('Jordan');
      game.nextQuestion();
      game.submitAnswer('Kobe');
      game.nextQuestion();
      game.submitAnswer('Lebron');
      
      const stats = game.endGame();
      
      expect(stats).toHaveProperty('score');
      expect(stats).toHaveProperty('totalQuestions');
      expect(stats).toHaveProperty('percentage');
    });

    test('should calculate 100% for perfect score', () => {
      // Answer all questions correctly
      game.submitAnswer('Jordan');
      game.nextQuestion();
      game.submitAnswer('Kobe');
      game.nextQuestion();
      game.submitAnswer('Lebron');
      
      const stats = game.endGame();
      
      expect(stats.score).toBe(3);
      expect(stats.totalQuestions).toBe(3);
      expect(stats.percentage).toBe(100);
    });

    test('should calculate 67% for 2 out of 3 correct', () => {
      // Answer 2 correctly, 1 incorrectly
      game.submitAnswer('Jordan'); // Correct
      game.nextQuestion();
      game.submitAnswer('Jordan'); // Incorrect (should be Kobe)
      game.nextQuestion();
      game.submitAnswer('Lebron'); // Correct
      
      const stats = game.endGame();
      
      expect(stats.score).toBe(2);
      expect(stats.totalQuestions).toBe(3);
      expect(stats.percentage).toBe(67);
    });

    test('should calculate 0% for all incorrect', () => {
      // Answer all incorrectly
      game.submitAnswer('Kobe'); // Wrong
      game.nextQuestion();
      game.submitAnswer('Lebron'); // Wrong
      game.nextQuestion();
      game.submitAnswer('Jordan'); // Wrong
      
      const stats = game.endGame();
      
      expect(stats.score).toBe(0);
      expect(stats.totalQuestions).toBe(3);
      expect(stats.percentage).toBe(0);
    });

    test('should set game as inactive', () => {
      game.endGame();
      const state = game.getGameState();
      
      expect(state.isActive).toBe(false);
    });
  });

  describe('getGameState()', () => {
    test('should return current game state', () => {
      game.startGame();
      const state = game.getGameState();
      
      expect(state).toHaveProperty('score');
      expect(state).toHaveProperty('currentQuestion');
      expect(state).toHaveProperty('totalQuestions');
      expect(state).toHaveProperty('isActive');
    });

    test('should reflect score changes', () => {
      game.startGame();
      game.submitAnswer('Jordan'); // Correct
      
      const state = game.getGameState();
      expect(state.score).toBe(1);
    });

    test('should reflect question progression', () => {
      game.startGame();
      expect(game.getGameState().currentQuestion).toBe(1);
      
      game.nextQuestion();
      expect(game.getGameState().currentQuestion).toBe(2);
      
      game.nextQuestion();
      expect(game.getGameState().currentQuestion).toBe(3);
    });
  });

  describe('resetGame()', () => {
    test('should reset score to 0', () => {
      game.startGame();
      game.submitAnswer('Jordan');
      game.resetGame();
      
      const state = game.getGameState();
      expect(state.score).toBe(0);
    });

    test('should reset to first question', () => {
      game.startGame();
      game.nextQuestion();
      game.nextQuestion();
      game.resetGame();
      
      const state = game.getGameState();
      expect(state.currentQuestion).toBe(1);
    });

    test('should set game as inactive', () => {
      game.startGame();
      game.resetGame();
      
      const state = game.getGameState();
      expect(state.isActive).toBe(false);
    });
  });

  describe('Full Game Flow', () => {
    test('should handle a complete game with perfect score', () => {
      game.startGame();
      
      // Question 1
      let question = game.getCurrentQuestion();
      expect(question.question).toContain('best basketball player');
      game.submitAnswer('Jordan');
      game.nextQuestion();
      
      // Question 2
      question = game.getCurrentQuestion();
      expect(question.question).toContain('best Scorer');
      game.submitAnswer('Kobe');
      game.nextQuestion();
      
      // Question 3
      question = game.getCurrentQuestion();
      expect(question.question).toContain('All around player');
      game.submitAnswer('Lebron');
      game.nextQuestion();
      
      // Game should be over
      expect(game.isGameOver()).toBe(true);
      
      // Check final score
      const stats = game.endGame();
      expect(stats.score).toBe(3);
      expect(stats.percentage).toBe(100);
    });

    test('should handle a complete game with mixed results', () => {
      game.startGame();
      
      game.submitAnswer('Kobe'); // Wrong
      game.nextQuestion();
      game.submitAnswer('Kobe'); // Correct
      game.nextQuestion();
      game.submitAnswer('Jordan'); // Wrong
      game.nextQuestion();
      
      expect(game.isGameOver()).toBe(true);
      
      const stats = game.endGame();
      expect(stats.score).toBe(1);
      expect(stats.percentage).toBe(33);
    });
  });
});
