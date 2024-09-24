import {describe, it, expect, beforeEach, afterEach} from '@jest/globals';
import { render, renderHook, act, userEvent, waitFor, fireEvent } from '@testing-library/react-native';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

import SearchScreen from '../SearchScreen';
import SearchScreenView from '../SearchScreenView';
import useSearchScreen from '../useSearchScreen';

import stars from '../../../assets/stars';

import { DARK } from '../../../assets/ColorPalettes';
import { useEvent } from 'react-native-reanimated';

const mock = new MockAdapter(axios)

mock.onGet('/catalogueObjects/search', {params: {searchText: 'HD1'}}).reply(200, {
    catalogueObjects: stars
})

mock.onGet('/catalogueObjects/search', {params: {searchText: 'HD0'}}).reply(200, {
    catalogueObjects: []
})

describe('SearchScreen', () => {
    const navigation = {}
    const route = {}

    describe('Logic', () => {
        it('Fetches test catalogueObjects list', async() => {

            const { result } = renderHook(() => useSearchScreen({navigation, route}))

            await act(async() => {
                result.current.FetchSearchObjects('HD1')
            })

            expect(result.current.search.length).toBe(5)
            
        })
    })
    describe('View', () => {
        it('Renders 5 catalogueObject cards', async() => {
            const { getAllByTestId, getByTestId, getAllByText,debug } = render(<SearchScreen navigation={navigation} route={route}/>)

            await waitFor(async() => {
                const searchBar = getByTestId('searchBar')
                //await userEvent.type(searchBar, 'HD1')
                //await fireEvent.changeText(searchBar, 'HD1')
                const user = userEvent.setup()
                await user.type(searchBar, 'HD1', {submitEditing: true})

                const test = getAllByText('Those ridiculous ties!')
                //const result = getAllByTestId('CatalogueObjectCard')

                //expect(result.length).toBe(5)
            })
        })

        it('Doesn\'t render any catalogueObject card', () => {
            const { queryAllByTestId } = render(<SearchScreen navigation={navigation} route={route}/>)

            const result = queryAllByTestId('CatalogueObjectCard')

            expect(result.length).toBe(0)
        })
    })
})