import {describe, it, expect} from '@jest/globals';
import { render, renderHook, userEvent, waitFor } from '@testing-library/react-native';

import SearchInputScreen from '../SearchInputScreen';

import { CatalogueObject } from '../../catalogueObjectCard/CatalogueObjectCard';

import { DARK } from '../../../assets/ColorPalettes';
import useSearchInputScreen from '../useSearchInputScreen';

const Vega: CatalogueObject = {
    Names: ['Vega', 'alf Lyr', '3 Lyr'],
    HD_ID: 172167,
    RA: 18.615972,
    DE: 38.76861,
    PhotovisualMagnitude: 0.14,
    SpectralType: 'A0',
    ThemeColors: DARK.SearchInputScreen
}

const Sirius: CatalogueObject = {
    Names: ['Sirius', 'Dog Star', 'Sirius A'],
    HD_ID: 48915,
    RA: 6.752806,
    DE: -16.68694,
    PhotovisualMagnitude: -1.58,
    SpectralType: 'A0',
    ThemeColors: DARK.SearchInputScreen
}

describe('SearchInputScreen', () => {
    describe('Logic', () => {
        const navigation = {}
        const route = {}
        it('Changes origin object to Vega', async() => {
            const{result} = renderHook(() => useSearchInputScreen({navigation, route}))

            await waitFor(() => {
                result.current.ChangeObject(Vega, 'origin')

                const originObject = result.current.originObject

                expect(originObject).toBe(Vega)
            })
        })

        it('Changes target object to Sirius', async() => {
            const{result} = renderHook(() => useSearchInputScreen({navigation, route}))

            await waitFor(() => {
                result.current.ChangeObject(Sirius, 'target')

                const targetObject = result.current.targetObject

                expect(targetObject).toBe(Sirius)
            })
        })

        it('Returns the right RA', async() => {
            const{result} = renderHook(() => useSearchInputScreen({navigation, route}))

            await waitFor(() => {
                result.current.ChangeObject(Vega, 'origin')
                result.current.ChangeObject(Sirius, 'target')

                const resultRA = result.current.resultRA

                expect(resultRA).toStrictEqual([-11, 51, 47.4,])
            })
        })

        it('Returns the right DE', async() => {
            const{result} = renderHook(() => useSearchInputScreen({navigation, route}))

            await waitFor(() => {
                result.current.ChangeObject(Vega, 'origin')
                result.current.ChangeObject(Sirius, 'target')

                const resultDE = result.current.resultDE

                expect(resultDE).toStrictEqual([-55, 27, 19.98])
            })
        })

        it('Returns 0 for RA', async() => {
            const{result} = renderHook(() => useSearchInputScreen({navigation, route}))

            await waitFor(() => {
                result.current.ChangeObject(Vega, 'origin')
                result.current.ChangeObject(Vega, 'target')

                const resultRA = result.current.resultRA
                expect(resultRA).toStrictEqual([0, 0, 0])
            })
        })

        it('Returns 0 for DE', async() => {
            const{result} = renderHook(() => useSearchInputScreen({navigation, route}))

            await waitFor(() => {
                result.current.ChangeObject(Vega, 'origin')
                result.current.ChangeObject(Vega, 'target')

                const resultDE = result.current.resultDE
                expect(resultDE).toStrictEqual([0, 0, 0])
            })
        })
    })

    describe('View', () => {
        const navigation = {}
        const route = {}

        it('Renders 2 CatalogueObjectCards', () => {
            const{ getAllByTestId } = render(<SearchInputScreen navigation={navigation} route={route}/>)
    
            const result = getAllByTestId('CatalogueObjectCard')
    
            expect(result.length).toBe(2)
        })
    
        it('Renders 2 search icons', () => {
            const{ queryAllByTestId } = render(<SearchInputScreen navigation={navigation} route={route}/>)
    
            const result = queryAllByTestId('SearchIcon')
            console.log(result.length)
    
            expect(result.length).toBe(2)
        })
    
        it('Show the relative right ascension', () => {
            const{ getByText } = render(<SearchInputScreen navigation={navigation} route={route}/>)
    
            const result = getByText('RA: 0h 0m 0s')
    
            expect(result).toBeTruthy()
        })
    
        it('Show the relative declination', () => {
            const{ getByText } = render(<SearchInputScreen navigation={navigation} route={route}/>)
    
            const result = getByText(`DE: 0º 0' 0"`)
    
            expect(result).toBeTruthy()
        })
    })  
})