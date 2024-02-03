// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initBalance = 100;
    const account = getBankAccount(initBalance);
    expect(account.getBalance()).toBe(initBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initBalance = 100;
    const account = getBankAccount(initBalance);

    expect(() => account.withdraw(initBalance + 1)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initBalance = 100;
    const senderAccount = getBankAccount(initBalance);
    const receiverAccount = getBankAccount(initBalance);

    expect(() =>
      senderAccount.transfer(initBalance + 1, receiverAccount),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initBalance = 100;
    const account = getBankAccount(initBalance);

    expect(() => account.transfer(initBalance + 1, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initBalance = 100;
    const depositSum = 50;
    const total = initBalance + depositSum;
    const account = getBankAccount(initBalance).deposit(depositSum);

    expect(account.getBalance()).toBe(total);
  });

  test('should withdraw money', () => {
    const initBalance = 100;
    const withdrawSum = 50;
    const total = initBalance - withdrawSum;
    const account = getBankAccount(initBalance).withdraw(withdrawSum);

    expect(account.getBalance()).toBe(total);
  });

  test('should transfer money', () => {
    const initBalance = 100;
    const transferSum = 50;
    const senderBalanceAfter = initBalance - transferSum;
    const receiverBalanceAfter = initBalance + transferSum;
    const senderAccount = getBankAccount(initBalance);
    const receiverAccount = getBankAccount(initBalance);
    senderAccount.transfer(transferSum, receiverAccount);

    expect(senderAccount.getBalance()).toBe(senderBalanceAfter);
    expect(receiverAccount.getBalance()).toBe(receiverBalanceAfter);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initBalance = 100;
    const returnValue = 50;
    const account = getBankAccount(initBalance);
    jest
      .spyOn(account, 'fetchBalance')
      .mockReturnValue(Promise.resolve(returnValue));

    const newBalance = await account.fetchBalance();
    expect(newBalance).toBe(returnValue);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initBalance = 100;
    const returnValue = 50;
    const account = getBankAccount(initBalance);
    jest
      .spyOn(account, 'fetchBalance')
      .mockReturnValue(Promise.resolve(returnValue));

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(returnValue);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initBalance = 100;
    const returnValue = null;
    const account = getBankAccount(initBalance);
    jest
      .spyOn(account, 'fetchBalance')
      .mockReturnValue(Promise.resolve(returnValue));

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
