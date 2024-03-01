/**
 * * @jest-environment jsdom
 *  * @jest-environment-options {"url": "https://jestjs.io/"}
 */
import { renderHook, act } from '@testing-library/react-hooks';
import useAuth from './auth.hook.js';
import $api from '../http';

jest.mock('../http', () => ({
  post: jest.fn(),
  get: jest.fn()
}));

describe('useAuth', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('login', () => {
    test('should login successfully', async () => {
      $api.post.mockResolvedValue({ data: { accessToken: 'token', user: { id: 1, name: 'John' } } });

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.login({ username: 'john_doe', password: 'password' });
        // await waitForNextUpdate({ timeout: 3000 });
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual({ id: 1, name: 'John' });
      expect(localStorage.getItem('accessToken')).toBe('token');
    });

    test('should handle login failure', async () => {
      $api.post.mockRejectedValue({ response: { data: { message: 'Authentication failed' } } });

      const { result } = renderHook(() => useAuth());

      try {
        await result.current.login({ username: 'john_doe', password: 'password' });
        // If the catch block doesn't throw an error, fail the test
        fail('Expected error to be thrown');
      } catch (error) {
        expect(error).toEqual('Authentication failed');
        // Assert any other expectations as needed
      }
    });
  });

  // Add similar describe and test blocks for logout, checkAuth, and register
  // ...

});
