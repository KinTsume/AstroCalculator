import {describe, it, expect, jest} from '@jest/globals';
import { render, renderHook, userEvent, waitFor } from '@testing-library/react-native';

import SearchInputScreen from '../SearchInputScreen';

import { CatalogueObject } from '../../catalogueObjectCard/CatalogueObjectCard';
import { navigationProps } from '../useSearchInputScreen';

import { DARK } from '../../../assets/ColorPalettes';
import useSearchInputScreen from '../useSearchInputScreen';

const Vega: CatalogueObject = {
    Names: ['Vega', 'alf Lyr', '3 Lyr'],
    HD_ID: 172167,
    RA: 18.615972,
    DE: 38.76861,
    PhotovisualMagnitude: 0.14,
    SpectralType: 'A0',
}

const Sirius: CatalogueObject = {
    Names: ['Sirius', 'Dog Star', 'Sirius A'],
    HD_ID: 48915,
    RA: 6.752806,
    DE: -16.68694,
    PhotovisualMagnitude: -1.58,
    SpectralType: 'A0',
}

const setObjectMock = jest.fn()

describe('SearchInputScreen', () => {
    describe('Logic', () => {
        let propsMock: navigationProps = {
            navigation: '',
            route: {
                params: {
                    catalogueObject: Vega,
                    position: ''
                }
            },
            originObject: Vega,
            targetObject: Sirius,
            SetObject: setObjectMock        
        }

        it('Returns the right RA', async() => {

            const{result} = renderHook(() => useSearchInputScreen(propsMock))

            const resultRA = result.current.resultRA

            expect(resultRA).toStrictEqual([-11, 51, 47.4])
        })

        it('Returns the right DE', async() => {
            const{result} = renderHook(() => useSearchInputScreen(propsMock))

            const resultDE = result.current.resultDE

            expect(resultDE).toStrictEqual([-55, 27, 19.98])
        })

        it('Returns 0 for RA', async() => {
            propsMock.targetObject = Vega

            const{result} = renderHook(() => useSearchInputScreen(propsMock))

            const resultRA = result.current.resultRA
            expect(resultRA).toStrictEqual([0, 0, 0])
        })

        it('Returns 0 for DE', async() => {
            const{result} = renderHook(() => useSearchInputScreen(propsMock))

            const resultDE = result.current.resultDE
            expect(resultDE).toStrictEqual([0, 0, 0])
        })
    })

    describe('View', () => {
        let propsMock: navigationProps = {
            navigation: '',
            route: {
                params: {
                    catalogueObject: Vega,
                    position: ''
                }
            },
            originObject: Vega,
            targetObject: Sirius,
            SetObject: setObjectMock        
        }

        it('Renders 2 CatalogueObjectCards', () => {
            const{ getAllByTestId } = render(<SearchInputScreen {...propsMock}/>)
    
            const result = getAllByTestId('CatalogueObjectCard')
    
            expect(result.length).toBe(2)
        })
    
        it('Renders 2 search icons', () => {
            const{ queryAllByTestId } = render(<SearchInputScreen {...propsMock}/>)
    
            const result = queryAllByTestId('SearchIcon')
            console.log(result.length)
    
            expect(result.length).toBe(2)
        })
    
        it('Show the relative right ascension', () => {
            const{ getByText } = render(<SearchInputScreen {...propsMock}/>)
    
            const result = getByText('RA: -11h 51m 47.4s')
    
            expect(result).toBeTruthy()
        })
    
        it('Show the relative declination', () => {
            const{ getByText } = render(<SearchInputScreen {...propsMock}/>)
    
            const result = getByText(`DE: -55º 27' 19.98"`)
    
            expect(result).toBeTruthy()
        })
    })  
})