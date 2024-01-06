/**
 * @jest-environment jsdom
 */
/* eslint-disable */
import { renderHook, act } from '@testing-library/react';
import { useHttp } from './http.hook';
const requestBody = {
    test: true
}
const requestBodyWithFile = {
    file: 'string'
}
const responseData = {
    user: { name: 'Test' }
}
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(responseData),
        ok: true
    })
);

describe('test http functionality', () => {


    it('should have default values',  () => {
        const { result } = renderHook(() => useHttp());

        expect(result.current.loading).toBeFalsy()
        expect(result.current.error).toBeNull()

    });

    it('should return object with correct data',  () => {
        const { result } = renderHook(() => useHttp());

        expect(result.current.loading).toBeFalsy()
        expect(result.current.request).toBeInstanceOf(Function)
        expect(result.current.error).toBeNull()
        expect(result.current.clearError).toBeInstanceOf(Function)

    });

    it('it should return http response on request method call',async () => {
        const { result } = renderHook(() => useHttp());

        await act(async () => {
            const data = await result.current.request('/api/auth/token');

            expect(data).toMatchObject(responseData);
        })
    });

    it('it should return http response on request method call with body file',async () => {
        const { result } = renderHook(() => useHttp());

        await act(async () => {
            const data = await result.current.request('/api/auth/token', 'POST', requestBodyWithFile);

            expect(data).toMatchObject(responseData);
        })
    });

    it('it should return http response on request method call with body',async () => {
        const { result } = renderHook(() => useHttp());

        await act(async () => {
            const data = await result.current.request('/api/auth/token', 'POST', requestBody);

            expect(data).toMatchObject(responseData);
        })
    });


    it('it should set error message on request method fail call',async () => {
        const { result } = renderHook(() => useHttp());
        fetch.mockImplementationOnce(() => Promise.reject({message: "API is down"}));
        let errorMessage = '';

        await act(async () => {
            errorMessage = await result.current.request('/api/auth/token');
        })
        expect(result.current.error).toMatch('API is down');
    });
})

