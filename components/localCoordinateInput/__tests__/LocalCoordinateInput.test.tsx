import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { render, renderHook, userEvent, waitFor } from '@testing-library/react-native';

import LocalCoordinateInput from '../LocalCoordinateInput';
import useLocalCoordinateInput from '../useLocalCoordinateInput';
import LocalCoordinateInputView, { LocalCoordinateInputViewProps } from '../LocalCoordinatesInputView';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppConfig from '../../../assets/AppConfig';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

let viewPropsMock: LocalCoordinateInputViewProps = {
    SaveLatitude: jest.fn(), 
    SaveLongitude: jest.fn(),
    GetGeolocation: jest.fn(),
    latitude: 0,
    longitude: 0
}

beforeEach(async() => {
    jest.useFakeTimers()

    viewPropsMock = {
        SaveLatitude: jest.fn(), 
        SaveLongitude: jest.fn(),
        GetGeolocation: jest.fn(),
        latitude: 0,
        longitude: 0
    }

    await AsyncStorage.setItem('position', JSON.stringify({
        latitude: 10,
        longitude: 25,
    }))
})

afterEach(() => {
    jest.useRealTimers()
})

describe('LocalCoordinateInput', () => {
    describe('Logic', () => {
        it('Sets the latitude', async() => {
            const { result } = renderHook(() => useLocalCoordinateInput())

            await waitFor(() => {
                result.current.SaveLatitude(['1', '2', '3'])

                const roundedValue = Math.round(1.034166667 * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision

                expect(result.current.latitude).toBe(roundedValue)
            }) 
        })

        it('Sets the longitude', async() => {
            const { result } = renderHook(() => useLocalCoordinateInput())

            await waitFor(() => {
                result.current.SaveLongitude(['20', '30', '40'])

                const roundedValue = Math.round(20.51111111111 * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision

                expect(result.current.longitude).toBe(roundedValue)
            }) 
        })

        it('Gets the geolocation latitude', async() => {
            const { result } = await waitFor(() => renderHook(() => useLocalCoordinateInput()))

            waitFor(() => {
                result.current.GetGeolocation()                
            })
            .then(() => {
                expect(result.current.latitude).toBe(-23.006945)
            })
        })

        it('Gets the geolocation longitude', async() => {
            const { result } = await waitFor(() => renderHook(() => useLocalCoordinateInput()))

            waitFor(() => {
                result.current.GetGeolocation()
            })
            .then(() => {
                expect(result.current.longitude).toBe(-44.31778)
            })
        })

    })

    describe('View', () => {

        it('Renders 2 CoordinateInputFields', async() => {
            const{ queryAllByTestId } = await waitFor(() => render(<LocalCoordinateInput/>))

            const result = queryAllByTestId('coordinateInputField')

            expect(result.length).toBe(2)
        })

        it('Renders the gps fill icon button', async() => {
            const{ queryByTestId } = await waitFor(() => render(<LocalCoordinateInput/>))

            const result = queryByTestId('gpsFillButton')

            expect(result).toBeTruthy()
        })

        it('Calls SaveLatitude', async() => {

            const {getAllByTestId, debug} = render(<LocalCoordinateInputView {...viewPropsMock} />)

            const subfields = getAllByTestId('inputSubfield')

            await userEvent.type(subfields[0], '10', {submitEditing: true})
            await userEvent.type(subfields[1], '11', {submitEditing: true})
            await userEvent.type(subfields[2], '12', {submitEditing: true})

            expect(viewPropsMock.SaveLatitude).toBeCalledTimes(6)
        })

        it('Calls SaveLongitude', async() => {
            const {getAllByTestId} = render(<LocalCoordinateInputView {...viewPropsMock} />)

            const subfields = getAllByTestId('inputSubfield')

            await userEvent.type(subfields[3], '10', {submitEditing: true})
            await userEvent.type(subfields[4], '11', {submitEditing: true})
            await userEvent.type(subfields[5], '12', {submitEditing: true})

            expect(viewPropsMock.SaveLongitude).toBeCalledTimes(6)
        })

        it('Calls save functions without submitting', async() => {
            
            const {getAllByTestId} = render(<LocalCoordinateInputView {...viewPropsMock} />)

            const subfields = getAllByTestId('inputSubfield')

            await userEvent.type(subfields[0], '10')
            await userEvent.type(subfields[1], '11')
            await userEvent.type(subfields[2], '12')

            await userEvent.type(subfields[3], '20')
            await userEvent.type(subfields[4], '21')
            await userEvent.type(subfields[5], '22')

            expect(viewPropsMock.SaveLatitude).toBeCalledTimes(3)
            expect(viewPropsMock.SaveLongitude).toBeCalledTimes(3)
        })
    
        it('Calls getGeolocation when icon button is pressed', () => {

            const{ queryByTestId } = render(<LocalCoordinateInputView {...viewPropsMock}/>)

            const result = queryByTestId('gpsFillButton')

            if(!result) return

            waitFor(() => {
                userEvent.press(result)
            })
            .then(() => {
                expect(viewPropsMock.GetGeolocation).toHaveBeenCalled()
            })
        })

        it('Sets the current latitude based on saved persistent data', async() => {

            const{ queryByText } = await waitFor(() => render(<LocalCoordinateInput/>))

            const latitude = queryByText('Latitude: 10')

            expect(latitude).toBeTruthy()
        })

        it('Sets the current longitude based on saved persistent data', async() => {

            const{ queryByText } = await waitFor(() => render(<LocalCoordinateInput/>))

            const longitude = queryByText('Longitude: 25')

            expect(longitude).toBeTruthy()
        })
    })
})