// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const expectation = {
      value: 'a',
      next: {
        value: 'b',
        next: {
          value: 'c',
          next: {
            value: 'd',
            next: { value: 'e', next: { value: null, next: null } },
          },
        },
      },
    };
    const res = generateLinkedList(['a', 'b', 'c', 'd', 'e']);
    expect(res).toStrictEqual(expectation);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const res = generateLinkedList(['a', 'b', 'c', 'd', 'e']);
    expect(res).toMatchSnapshot();
  });
});
