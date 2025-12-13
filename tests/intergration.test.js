// test for entire game flow
const game = require('../src/game');
const { getQuestions, getTotalQuestions } = require('../src/questions');

describe('Integration Tests - Complete Game Flow', () => {
  
  beforeEach(() => {
    game.resetGame();
  });

  describe('Questions and Game Module Integration', () => {
    test('game should use questions from questions module', () => {
      game.startGame();
      const totalQuestions = getTotalQuestions();
      const state = game.getGameState();
      
      expect(state.totalQuestions).toBe(totalQuestions);
    });

    test('game should correctly validate answers using questions module', () => {
      game.startGame();
      const questions = getQuestions();
      
      // Test each question's correct answer
      questions.forEach((question, index) => {
        if (index > 0) game.nextQuestion();
        const result = game.submitAnswer(question.correctAnswer);
        expect(result.isCorrect).toBe(true);
      });
    });
  });

  describe('Complete Game Scenarios', () => {
    test('scenario: perfect game (3/3 correct)', () => {
      game.startGame();
      
      // Answer all correctly
      game.submitAnswer('Jordan');
      expect(game.getGameState().score).toBe(1);
      
      game.nextQuestion();
      game.submitAnswer('Kobe');
      expect(game.getGameState().score).toBe(2);
      
      game.nextQuestion();
      game.submitAnswer('Lebron');
      expect(game.getGameState().score).toBe(3);
      
      game.nextQuestion();
      expect(game.isGameOver()).toBe(true);
      
      const stats = game.endGame();
      expect(stats.percentage).toBe(100);
    });

    test('scenario: failed game (0/3 correct)', () => {
      game.startGame();
      
      // Answer all incorrectly
      game.submitAnswer('Kobe');
      expect(game.getGameState().score).toBe(0);
      
      game.nextQuestion();
      game.submitAnswer('Lebron');
      expect(game.getGameState().score).toBe(0);
      
      game.nextQuestion();
      game.submitAnswer('Jordan');
      expect(game.getGameState().score).toBe(0);
      
      game.nextQuestion();
      expect(game.isGameOver()).toBe(true);
      
      const stats = game.endGame();
      expect(stats.percentage).toBe(0);
    });

    test('scenario: partial success (1/3 correct)', () => {
      game.startGame();
      
      game.submitAnswer('Jordan'); // Correct
      game.nextQuestion();
      game.submitAnswer('Jordan'); // Wrong
      game.nextQuestion();
      game.submitAnswer('Jordan'); // Wrong
      game.nextQuestion();
      
      const stats = game.endGame();
      expect(stats.score).toBe(1);
      expect(stats.percentage).toBe(33);
    });

    test('scenario: replay game after completion', () => {
      // Play first game
      game.startGame();
      game.submitAnswer('Jordan');
      game.nextQuestion();
      game.submitAnswer('Kobe');
      game.nextQuestion();
      game.submitAnswer('Lebron');
      game.nextQuestion();
      game.endGame();
      
      // Reset and play again
      game.resetGame();
      game.startGame();
      
      const state = game.getGameState();
      expect(state.score).toBe(0);
      expect(state.currentQuestion).toBe(1);
      expect(state.isActive).toBe(true);
      
      // Should be able to play through again
      game.submitAnswer('Kobe'); // Wrong answer this time
      const newState = game.getGameState();
      expect(newState.score).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    test('should handle submitting answer before starting game', () => {
      // Don't start game
      const result = game.submitAnswer('Jordan');
      
      // Should handle gracefully (might return null or default values)
      expect(result).toBeDefined();
    });

    test('should handle multiple endGame calls', () => {
      game.startGame();
      game.submitAnswer('Jordan');
      game.nextQuestion();
      game.submitAnswer('Kobe');
      game.nextQuestion();
      game.submitAnswer('Lebron');
      
      const stats1 = game.endGame();
      const stats2 = game.endGame(); // Call again
      
      // Should return consistent results
      expect(stats1.score).toBe(stats2.score);
      expect(stats1.percentage).toBe(stats2.percentage);
    });

    test('should handle getting current question after game ends', () => {
      game.startGame();
      game.nextQuestion();
      game.nextQuestion();
      game.nextQuestion();
      
      const question = game.getCurrentQuestion();
      expect(question).toBeNull();
    });
  });

  describe('State Consistency', () => {
    test('score should never decrease', () => {
      game.startGame();
      let previousScore = 0;
      
      game.submitAnswer('Jordan'); // Correct
      let currentScore = game.getGameState().score;
      expect(currentScore).toBeGreaterThanOrEqual(previousScore);
      previousScore = currentScore;
      
      game.nextQuestion();
      game.submitAnswer('Jordan'); // Wrong
      currentScore = game.getGameState().score;
      expect(currentScore).toBeGreaterThanOrEqual(previousScore);
    });

    test('current question should progress sequentially', () => {
      game.startGame();
      
      expect(game.getGameState().currentQuestion).toBe(1);
      game.nextQuestion();
      expect(game.getGameState().currentQuestion).toBe(2);
      game.nextQuestion();
      expect(game.getGameState().currentQuestion).toBe(3);
    });

    test('total questions should remain constant', () => {
      game.startGame();
      const total = game.getGameState().totalQuestions;
      
      game.nextQuestion();
      expect(game.getGameState().totalQuestions).toBe(total);
      
      game.nextQuestion();
      expect(game.getGameState().totalQuestions).toBe(total);
    });
  });
});
