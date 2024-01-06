/**
 * @jest-environment jsdom
 */
/* eslint-disable */
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import useToken from './token.hook';
import useStorage from './storage';
import { useHttp } from './http.hook';

const TOKEN = {
    accessToken: 'access-Token',
    refreshToken: 'refresh-Token'
}
const UPDATED_TOKEN = {
    accessToken: 'access-Token-Updated',
    refreshToken: 'refresh-Token-Updated'
}

jest.mock('./storage');
jest.mock('./http.hook');

describe('test token functionality', () => {
    beforeEach(() => {
        //React.useState = jest.fn().mockReturnValue([TOKEN, jest.fn()])
        useStorage.mockReturnValue({UPDATED_TOKEN})
        useHttp.mockReturnValue({ request: () => UPDATED_TOKEN })
    })
    it('it should return object values',  () => {
        const { result } = renderHook(() => useToken());

        console.dir(result.current)

        expect(result.current.token).toMatchObject(TOKEN)
        expect(result.current.isTokenExpired).toBeInstanceOf(Function)
        expect(result.current.getUpdatedToken).toBeInstanceOf(Function)
        expect(result.current.removeToken).toBeInstanceOf(Function)
    });

    it('it should update token value',() => {
        const { result } = renderHook(() => useToken());

        act(() => {
            result.current.getUpdatedToken(TOKEN)
        })
        console.dir(result.current)
    });
});