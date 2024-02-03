// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 10, b: 15, action: Action.Add };
    const expectation = 25;
    expect(simpleCalculator(input)).toBe(expectation);
  });

  test('should subtract two numbers', () => {
    const input = { a: 25, b: 15, action: Action.Subtract };
    const expectation = 10;
    expect(simpleCalculator(input)).toBe(expectation);
  });

  test('should multiply two numbers', () => {
    const input = { a: 10, b: 15, action: Action.Multiply };
    const expectation = 150;
    expect(simpleCalculator(input)).toBe(expectation);
  });

  test('should divide two numbers', () => {
    const input = { a: 30, b: 15, action: Action.Divide };
    const expectation = 2;
    expect(simpleCalculator(input)).toBe(expectation);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 10, b: 3, action: Action.Exponentiate };
    const expectation = 1000;
    expect(simpleCalculator(input)).toBe(expectation);
  });

  test('should return null for invalid action', () => {
    const input = { a: 25, b: 15, action: 'DontDoThat' };
    expect(simpleCalculator(input)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = { a: 'veryLargeNumber', b: 15, action: Action.Add };
    expect(simpleCalculator(input)).toBeNull();
  });
});
