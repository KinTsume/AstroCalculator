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
import { CatalogueObject } from '../../catalogueObjectCard/CatalogueObjectCard';

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

beforeEach(() => {
    jest.useFakeTimers()
})

afterEach(() => {
    jest.useRealTimers()
})

describe('SearchScreen', () => {
    const propsMock = {
        navigation: {
            replace: jest.fn()
        },
        route: {
            params: {
                ChangeObject: jest.fn()
            }
        }
    }

    describe('Logic', () => {
        it('Fetches test catalogueObjects list', () => {

            const { result } = renderHook(() => useSearchScreen({...propsMock}))

            waitFor(() => result.current.FetchSearchObjects('HD'))
            .then(() => {
                expect(result.current.search.length).toBe(5)
            })
            
        })
        
        it('Calls navigation.replace', () => {
            const { result } = renderHook(() => useSearchScreen({...propsMock}))

            waitFor(() => {
                result.current.SetSearchedObject(stars[1], 'origin')
            })
            .then(() => {
                expect(propsMock.navigation.replace).toHaveBeenCalled()
            })

        })
    })
    describe('View', () => {
        it('Renders 5 catalogueObject cards', () => {
            const { getAllByTestId, getByTestId } = render(<SearchScreen {...propsMock}/>)

            waitFor(() => {
                const searchBar = getByTestId('searchBar')

                userEvent.type(searchBar, 'HD', {submitEditing: true})
            })
            .then(() => {
                const result = getAllByTestId('CatalogueObjectCard')

                expect(result.length).toBe(5)
            })
        })

        it("Doesn't render any catalogueObject card", () => {
            const { queryAllByTestId } = render(<SearchScreen {...propsMock}/>)

            const result = queryAllByTestId('CatalogueObjectCard')

            expect(result.length).toBe(0)
        })
    })
})