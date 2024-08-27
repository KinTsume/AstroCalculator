import {describe, it, expect, beforeEach, afterEach} from '@jest/globals';
import { render, renderHook, act, userEvent } from '@testing-library/react-native';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

import SearchScreen from '../SearchScreen';
import SearchScreenView from '../SearchScreenView';
import useSearchScreen from '../useSearchScreen';

import stars from '../../../assets/stars';

import { DARK } from '../../../assets/ColorPalettes';

const mock = new MockAdapter(axios)

mock.onGet('/catalogueObjects/search', {params: {searchText: 'HD1'}}).reply(200, {
    catalogueObjects: stars
})

mock.onGet('/catalogueObjects/search', {params: {searchText: 'HD0'}}).reply(200, {
    catalogueObjects: []
})

describe('SearchScreen', () => {
    describe('Logic', () => {
        it('Fetches test catalogueObjects list', async() => {

            const { result } = renderHook(useSearchScreen)

            await act(async() => {
                result.current.FetchSearchObjects('HD1')
            })

            expect(result.current.search.length).toBe(5)
            
        })
    })
    describe('View', () => {
        it('Renders 5 catalogueObject cards', async() => {
            const { getAllByTestId, getByTestId, debug } = render(<SearchScreen/>)

            await act(async() => {
                const searchBar = getByTestId('searchBar')
                await userEvent.type(searchBar, 'HD1')
            })

            const result = getAllByTestId('CatalogueObjectCard')
            debug()

            expect(result.length).toBe(5)
        })

        it('Doesn\'t render any catalogueObject card', () => {
            const { queryAllByTestId } = render(<SearchScreen/>)

            const result = queryAllByTestId('CatalogueObjectCard')

            expect(result.length).toBe(0)
        })
    })
})