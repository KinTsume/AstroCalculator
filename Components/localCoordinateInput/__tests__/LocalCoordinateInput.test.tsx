import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { render, renderHook, userEvent, waitFor } from '@testing-library/react-native';

import LocalCoordinateInput from '../LocalCoordinateInput';
import useLocalCoordinateInput from '../useLocalCoordinateInput';

import { localCoordinateInputProps } from '../useLocalCoordinateInput';
import AppConfig from '../../../assets/AppConfig';

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

    })

    describe('View', () => {
        it('Renders 2 CoordinateInputFields', () => {
            const{ queryAllByTestId } = render(<LocalCoordinateInput/>)

            const result = queryAllByTestId('coordinateInputField')

            expect(result.length).toBe(2)
        })

        it('Renders the gps fill icon button', () => {
            const{ queryByTestId } = render(<LocalCoordinateInput/>)

            const result = queryByTestId('gpsFillButton')

            expect(result).toBeTruthy()
        })
    })
})