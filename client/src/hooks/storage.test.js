/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react';
import useStorage from './storage';
const TEST_KEY = "JWT_TOKEN";
const TEST_VALUE = '{"accessToken":"TstR7ThcT1lI","refreshToken":"jhHaCw7M7ZJ-PBzIIvkzT77kRZLb6pQiMoZkPqpMwYE"}'
const UPDATED_VALUE = {
    accessToken: 'SdsiEUhNgt_qhTp5fG2foU0lC1hEyTDfltwF_BvJnE',
    refreshToken: 'toBbGzpsH9G1eTj04MfWr1yh42TzCyuPwKmXV-STidk'
}

const localStorageMock = (function() {
    let store = {}

    return {
        getItem: function(key) {
            return store[key] || null
        },
        setItem: function(key, value) {
            store[key] = value.toString()
        },
        removeItem: function(key) {
            delete store[key]
        },
        clear: function() {
            store = {}
        }
    }
})()

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
})
const eventMap = {};
window.addEventListener = jest.fn((event, cb) => {
    eventMap[event] = cb;
});

describe('useStorage', () => {
    beforeEach(() => {
        console.log(localStorage)
        localStorage.setItem(TEST_KEY, TEST_VALUE);
    });

    test('it returns undefined when empty params', () => {
        const { result } = renderHook(() => useStorage());
        expect(result.current).toBeUndefined();
    });

    test('it returns correct object with data', () => {
        const { result } = renderHook(() => useStorage(TEST_KEY));

        expect(result.current.storageVal).toBeInstanceOf(Object)
        expect(result.current.updateStorage).toBeInstanceOf(Function)
        expect(result.current.clearStorage).toBeInstanceOf(Function)
    });

    test('it updates localStorage correctly', () => {
        const { result } = renderHook(() => useStorage(TEST_KEY));

        act(() => {
            result.current.updateStorage(UPDATED_VALUE)
            eventMap.storage({newValue: UPDATED_VALUE, key: TEST_KEY});
        })

        expect(JSON.parse(localStorage.getItem(TEST_KEY))).toMatchObject(UPDATED_VALUE);

    });

    test('it clear localStorage correctly', () => {
        const { result } = renderHook(() => useStorage(TEST_KEY));

        act(() => {
            result.current.clearStorage()
            //eventMap.storage({newValue: UPDATED_VALUE, key: TEST_KEY});
        })

        expect(localStorage.getItem(TEST_KEY)).toBeNull();

    });
});
//
// test("should make a call to the API and return the message", async () => {
//     let hook;
//     await act(async () => {
//         hook = renderHook(() => useStorage(TEST_KEY));
//     });
//     const { result } = hook;
//     expect(result.current.storageVal).toBe(TEST_VALUE)
//     expect(result.current.updateStorage).toBeInstanceOf(Function)
//     expect(result.current.clearStorage).toBeInstanceOf(Function)
// });