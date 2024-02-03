// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.mock('axios');
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const createValue = { baseURL: 'https://jsonplaceholder.typicode.com' };
    const relativePath = 'posts';

    const spy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    expect(spy).toHaveBeenCalledWith(createValue);
  });

  test('should perform request to correct provided url', async () => {
    const createValue = { baseURL: 'https://jsonplaceholder.typicode.com' };
    const relativePath = 'posts';

    const axiosInstance = axios.create(createValue);
    const axiosInstanceGetSpy = jest.spyOn(axiosInstance, 'get');
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    axiosCreateSpy.mockReturnValue(axiosInstance);

    await throttledGetDataFromApi(relativePath);
    expect(axiosInstanceGetSpy).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(axiosInstanceGetSpy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const createValue = { baseURL: 'https://jsonplaceholder.typicode.com' };
    const relativePath = 'posts';
    const responseData = { data: 'I hate tests' };

    const axiosInstance = axios.create(createValue);
    const axiosInstanceGetSpy = jest.spyOn(axiosInstance, 'get');
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    axiosCreateSpy.mockReturnValue(axiosInstance);
    axiosInstanceGetSpy.mockReturnValue(Promise.resolve(responseData));

    expect(await throttledGetDataFromApi(relativePath)).toBe(responseData.data);
    expect(axiosInstanceGetSpy).toHaveBeenCalled();
  });
});
