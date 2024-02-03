// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const timeOut = 500;
    doStuffByTimeout(callback, timeOut);
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledWith(callback, timeOut);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeOut = 500;
    doStuffByTimeout(callback, timeOut);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');
    const timeOut = 500;
    doStuffByInterval(callback, timeOut);
    expect(setInterval).toHaveBeenCalledWith(callback, timeOut);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeOut = 500;

    expect(callback).not.toHaveBeenCalled();

    doStuffByInterval(callback, timeOut);

    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    const filePath = 'someText.txt';
    await readFileAsynchronously(filePath);
    expect(spy).toHaveBeenCalledWith(__dirname, filePath);
  });

  test('should return null if file does not exist', async () => {
    const filePath = 'someText.txt';
    const content = await readFileAsynchronously(filePath);
    expect(content).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const filePath = 'index.ts';
    const content = await readFileAsynchronously(filePath);
    expect(content).not.toBeNull();
  });
});
