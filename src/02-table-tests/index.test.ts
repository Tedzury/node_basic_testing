// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 25, b: 15, action: Action.Subtract, expected: 10 },
  { a: 10, b: 15, action: Action.Multiply, expected: 150 },
  { a: 30, b: 15, action: Action.Divide, expected: 2 },
  { a: 10, b: 3, action: Action.Exponentiate, expected: 1000 },
  { a: 25, b: 15, action: 'DontDoThat', expected: null },
  { a: 'veryLargeNumber', b: 15, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'pattern1: calculatorTableTest(%s) = %s',
    (testCaseData) => {
      const { a, b, action, expected } = testCaseData;
      const input = { a, b, action };
      expect(simpleCalculator(input)).toBe(expected);
    },
  );
});
