// Tests for the questions module
const { getQuestions, getQuestion, getTotalQuestions, checkAnswer } = require('../src/questions');

describe('Questions Module', () => {
  
  describe('getQuestions()', () => {
    test('should return an array of questions', () => {
      const questions = getQuestions();
      expect(Array.isArray(questions)).toBe(true);
    });

    test('should return 3 questions', () => {
      const questions = getQuestions();
      expect(questions.length).toBe(3);
    });

    test('each question should have required properties', () => {
      const questions = getQuestions();
      questions.forEach(question => {
        expect(question).toHaveProperty('question');
        expect(question).toHaveProperty('options');
        expect(question).toHaveProperty('correctAnswer');
      });
    });

    test('each question should have exactly 3 options', () => {
      const questions = getQuestions();
      questions.forEach(question => {
        expect(question.options.length).toBe(3);
      });
    });

    test('correctAnswer should be one of the options', () => {
      const questions = getQuestions();
      questions.forEach(question => {
        expect(question.options).toContain(question.correctAnswer);
      });
    });
  });

  describe('getQuestion(index)', () => {
    test('should return the first question when index is 0', () => {
      const question = getQuestion(0);
      expect(question).toBeTruthy();
      expect(question.question).toBe('Who is the best basketball player of all-time?');
    });

    test('should return the second question when index is 1', () => {
      const question = getQuestion(1);
      expect(question).toBeTruthy();
      expect(question.question).toBe('Who is the best Scorer?');
    });

    test('should return the third question when index is 2', () => {
      const question = getQuestion(2);
      expect(question).toBeTruthy();
      expect(question.question).toBe('Who is the best All around player?');
    });

    test('should return null for invalid index (negative)', () => {
      const question = getQuestion(-1);
      expect(question).toBeNull();
    });

    test('should return null for invalid index (too large)', () => {
      const question = getQuestion(999);
      expect(question).toBeNull();
    });
  });

  describe('getTotalQuestions()', () => {
    test('should return 3', () => {
      const total = getTotalQuestions();
      expect(total).toBe(3);
    });

    test('should return a number', () => {
      const total = getTotalQuestions();
      expect(typeof total).toBe('number');
    });
  });

  describe('checkAnswer(questionIndex, userAnswer)', () => {
    test('should return true for correct answer to question 1', () => {
      const isCorrect = checkAnswer(0, 'Jordan');
      expect(isCorrect).toBe(true);
    });

    test('should return false for incorrect answer to question 1', () => {
      const isCorrect = checkAnswer(0, 'Kobe');
      expect(isCorrect).toBe(false);
    });

    test('should return true for correct answer to question 2', () => {
      const isCorrect = checkAnswer(1, 'Kobe');
      expect(isCorrect).toBe(true);
    });

    test('should return false for incorrect answer to question 2', () => {
      const isCorrect = checkAnswer(1, 'Jordan');
      expect(isCorrect).toBe(false);
    });

    test('should return true for correct answer to question 3', () => {
      const isCorrect = checkAnswer(2, 'Lebron');
      expect(isCorrect).toBe(true);
    });

    test('should return false for incorrect answer to question 3', () => {
      const isCorrect = checkAnswer(2, 'Kobe');
      expect(isCorrect).toBe(false);
    });

    test('should return false for invalid question index', () => {
      const isCorrect = checkAnswer(999, 'Jordan');
      expect(isCorrect).toBe(false);
    });

    test('should be case-sensitive', () => {
      const isCorrect = checkAnswer(0, 'jordan'); // lowercase
      expect(isCorrect).toBe(false);
    });
  });

  describe('Question Content Validation', () => {
    test('all questions should include Kobe, Jordan, and Lebron as options', () => {
      const questions = getQuestions();
      const expectedOptions = ['Kobe', 'Jordan', 'Lebron'];
      
      questions.forEach(question => {
        expect(question.options).toEqual(expect.arrayContaining(expectedOptions));
      });
    });

    test('question 1 correct answer should be Jordan', () => {
      const question = getQuestion(0);
      expect(question.correctAnswer).toBe('Jordan');
    });

    test('question 2 correct answer should be Kobe', () => {
      const question = getQuestion(1);
      expect(question.correctAnswer).toBe('Kobe');
    });

    test('question 3 correct answer should be Lebron', () => {
      const question = getQuestion(2);
      expect(question.correctAnswer).toBe('Lebron');
    });
  });
});
