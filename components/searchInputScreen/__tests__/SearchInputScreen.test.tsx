import {describe, it, expect, jest, beforeEach, afterEach} from '@jest/globals';
import { render, renderHook, userEvent, waitFor } from '@testing-library/react-native';

import SearchInputScreen from '../SearchInputScreen';

import { CatalogueObject } from '../../catalogueObjectCard/CatalogueObjectCard';
import { navigationProps } from '../useSearchInputScreen';

import { DARK } from '../../../assets/ColorPalettes';
import useSearchInputScreen from '../useSearchInputScreen';
import AppConfig from '../../../assets/AppConfig';

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
    fieldName: 'declination',
    fieldUnits: ['º', '´', '´´'],
    unitsMaxValue: [360, 60, 60], 
    SetObject: setObjectMock,  
}

beforeEach(() => {
    jest.useFakeTimers()
})

afterEach(() => {
    jest.useRealTimers()
    propsMock = {
        navigation: '',
        route: {
            params: {
                catalogueObject: Vega,
                position: ''
            }
        },
        originObject: Vega,
        targetObject: Sirius,
        fieldName: 'declination',
        fieldUnits: ['º', '´', '´´'],
        unitsMaxValue: [360, 60, 60], 
        SetObject: setObjectMock        
    }
})

describe('SearchInputScreen', () => {
    describe('Logic', () => {
        it('Returns the right RA', () => {

            const{result} = renderHook(() => useSearchInputScreen(propsMock))

            const resultRA = result.current.resultRA

            const roundedSeconds = Math.round(47.3976 * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision

            expect(resultRA).toStrictEqual([-11, 51, roundedSeconds])
        })

        it('Returns the right DE', async() => {
            const{result} = renderHook(() => useSearchInputScreen(propsMock))

            const resultDE = result.current.resultDE

            const roundedSeconds = Math.round(19.98 * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision

            expect(resultDE).toStrictEqual([-55, 27, roundedSeconds])
        })

        it('Returns 0 for RA', async() => {
            propsMock.targetObject = Vega

            const{result} = renderHook(() => useSearchInputScreen(propsMock))

            const resultRA = result.current.resultRA
            expect(resultRA).toStrictEqual([0, 0, 0])
        })

        it('Returns 0 for DE', async() => {
            propsMock.originObject = Sirius
            const{result} = renderHook(() => useSearchInputScreen(propsMock))

            const resultDE = result.current.resultDE
            expect(resultDE).toStrictEqual([0, 0, 0])
        })
    })

    describe('View', () => {
        it('Renders 2 CatalogueObjectCards', () => {
            const{ getAllByTestId } = render(<SearchInputScreen {...propsMock}/>)
    
            const result = getAllByTestId('CatalogueObjectCard')
    
            expect(result.length).toBe(2)
        })
    
        it('Renders 2 search icons', () => {
            const{ queryAllByTestId } = render(<SearchInputScreen {...propsMock}/>)
    
            const result = queryAllByTestId('SearchIcon')
    
            expect(result.length).toBe(2)
        })

        it('Renders 4 coordinateInputField', () => {
            const{ queryAllByTestId } = render(<SearchInputScreen {...propsMock}/>)

            const result = queryAllByTestId('coordinateInputField')
    
            expect(result.length).toBe(4)
        })

        it('Manually enters the origin', async() => {
            const{ getAllByTestId } = render(<SearchInputScreen {...propsMock}/>)

            const inputSubfields = getAllByTestId('inputSubfield')

            const originRightAscensionSubfields = inputSubfields.slice(0, 3)
            const originDeclinationSubfields = inputSubfields.slice(4, 6)
            const originConfirmButton = getAllByTestId('confirmButton')[0]

            await waitFor(async() => {
                await userEvent.type(originRightAscensionSubfields[0], '10')
                await userEvent.type(originRightAscensionSubfields[1], '20')
                await userEvent.type(originRightAscensionSubfields[2], '30')

                await userEvent.type(originDeclinationSubfields[0], '30')
                await userEvent.type(originDeclinationSubfields[1], '40')
                await userEvent.type(originDeclinationSubfields[2], '50')

                await userEvent.press(originConfirmButton)
            })

            const rawRightAscension = 10 + 20 / 60 + 30 / (60 * 60)
            const rawDeclination = 30 + 40 / 60 + 50 / (60 * 60)

            const convertedRightAscension = Math.round(rawRightAscension * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision
            const convertedDeclination = Math.round(rawDeclination * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision

            expect(propsMock.originObject.RA).toBe(convertedRightAscension)
            expect(propsMock.originObject.DE).toBe(convertedDeclination)
        })

        it('Manually enters the target', async() => {
            const{ getAllByTestId } = render(<SearchInputScreen {...propsMock}/>)

            const inputSubfields = getAllByTestId('inputSubfield')

            const targetRightAscensionSubfields = inputSubfields.slice(7, 9)
            const targetDeclinationSubfields = inputSubfields.slice(10, 12)
            const targetConfirmButton = getAllByTestId('confirmButton')[1]

            await waitFor(async() => {
                await userEvent.type(targetRightAscensionSubfields[0], '10')
                await userEvent.type(targetRightAscensionSubfields[1], '20')
                await userEvent.type(targetRightAscensionSubfields[2], '30')

                await userEvent.type(targetDeclinationSubfields[0], '30')
                await userEvent.type(targetDeclinationSubfields[1], '40')
                await userEvent.type(targetDeclinationSubfields[2], '50')

                await userEvent.press(targetConfirmButton)
            })

            const rawRightAscension = 10 + 20 / 60 + 30 / (60 * 60)
            const rawDeclination = 30 + 40 / 60 + 50 / (60 * 60)

            const convertedRightAscension = Math.round(rawRightAscension * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision
            const convertedDeclination = Math.round(rawDeclination * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision

            expect(propsMock.targetObject.RA).toBe(convertedRightAscension)
            expect(propsMock.targetObject.DE).toBe(convertedDeclination)
        })
    
        it('Show the relative right ascension', () => {
            const{ queryByText } = render(<SearchInputScreen {...propsMock}/>)

            const roundedSeconds = Math.round(47.3976 * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision
    
            const result = queryByText('RA: -11h 51m ' + roundedSeconds + `s`)
    
            expect(result).toBeTruthy()
        })
    
        it('Show the relative declination', () => {
            const{ queryByText } = render(<SearchInputScreen {...propsMock}/>)

            const roundedSeconds = Math.round(19.98 * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision
    
            const result = queryByText(`DE: -55º 27' ` + roundedSeconds + `"`)
    
            expect(result).toBeTruthy()
        })
    })  
})