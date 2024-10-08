import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { render, renderHook, userEvent, waitFor } from '@testing-library/react-native';

import LocalCoordinateInput from '../LocalCoordinateInput';
import useLocalCoordinateInput from '../useLocalCoordinateInput';

import { localCoordinateInputProps } from '../useLocalCoordinateInput';

describe('LocalCoordinateInput', () => {
    describe('Logic', () => {
        it('Sets the latitude', async() => {
            const { result } = renderHook(() => useLocalCoordinateInput())

            await waitFor(() => {
                result.current.SaveLatitude(['1', '2', '3'])
            }) 

            expect(result.current.latitude).toBe(1.03)
        })

        it('Sets the longitude', async() => {
            const { result } = renderHook(() => useLocalCoordinateInput())

            await waitFor(() => {
                result.current.SaveLongitude(['20', '30', '40'])
            }) 

            expect(result.current.longitude).toBe(20.51)
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