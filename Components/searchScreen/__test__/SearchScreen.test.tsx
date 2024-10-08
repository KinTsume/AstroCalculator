import {describe, it, expect, beforeEach, afterEach, jest} from '@jest/globals';
import { render, renderHook, act, userEvent, waitFor, fireEvent } from '@testing-library/react-native';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

import SearchScreen from '../SearchScreen';
import SearchScreenView from '../SearchScreenView';
import useSearchScreen from '../useSearchScreen';

import stars from '../../../assets/stars';

import { SearchScreenViewProps } from '../SearchScreenView';

import { DARK } from '../../../assets/ColorPalettes';
import { useEvent } from 'react-native-reanimated';

const mock = new MockAdapter(axios)

mock.onGet('/catalogueObjects/search', {params: {searchText: 'HD'}}).reply(200, {
    catalogueObjects: stars
})

mock.onGet('/catalogueObjects/search', {params: {searchText: 'HD1'}}).reply(200, {
    catalogueObjects: [stars[1]]
})

mock.onGet('/catalogueObjects/search', {params: {searchText: 'HD0'}}).reply(200, {
    catalogueObjects: []
})

describe('SearchScreen', () => {
    const changeObjectMock = jest.fn()
    const replaceMock = jest.fn()

    let navigation = {
        replace: () => {replaceMock()}
    }

    let route = {
        params: {
            ChangeObject: () => {changeObjectMock()}
        }
    }

    describe('Logic', () => {
        it('Fetches test catalogueObjects list', async() => {

            const { result } = renderHook(() => useSearchScreen({navigation, route}))

            await waitFor(() => result.current.FetchSearchObjects('HD'))

            expect(result.current.search.length).toBe(5)
            
        })
        
        it('Calls navigation.replace', async() => {
            const { result } = renderHook(() => useSearchScreen({navigation, route}))

            await waitFor(() => {
                result.current.SetSearchedObject(stars[1], 'origin')
            })

            expect(replaceMock).toHaveBeenCalled()
            
        })
    })
    describe('View', () => {
        it('Renders 5 catalogueObject cards', async() => {
            const { getAllByTestId, getByTestId, getAllByText,debug } = render(<SearchScreen navigation={navigation} route={route}/>)

            await waitFor(async() => {
                const searchBar = getByTestId('searchBar')

                const user = userEvent.setup()
                await user.type(searchBar, 'HD', {submitEditing: true})

                const result = getAllByTestId('CatalogueObjectCard')

                expect(result.length).toBe(5)
            })
        })

        it("Doesn't render any catalogueObject card", () => {
            const { queryAllByTestId } = render(<SearchScreen navigation={navigation} route={route}/>)

            const result = queryAllByTestId('CatalogueObjectCard')

            expect(result.length).toBe(0)
        })

        it("Calls setSearchedObject", () => {
            const { queryAllByTestId } = render(<SearchScreen navigation={navigation} route={route}/>)
        })
    })
})