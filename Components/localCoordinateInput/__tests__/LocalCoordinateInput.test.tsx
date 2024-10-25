import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { render, renderHook, userEvent, waitFor } from '@testing-library/react-native';

import LocalCoordinateInput from '../LocalCoordinateInput';
import useLocalCoordinateInput from '../useLocalCoordinateInput';

import { localCoordinateInputProps } from '../useLocalCoordinateInput';
import AppConfig from '../../../assets/AppConfig';
import LocalCoordinateInputView, { LocalCoordinateInputViewProps } from '../LocalCoordinatesInputView';

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

        it('Calls SaveLatitude', async() => {
            const SaveLatitudeMock = jest.fn()

            const propsMock: LocalCoordinateInputViewProps = {
                SaveLatitude: SaveLatitudeMock, 
                SaveLongitude: jest.fn(),
            }

            const {getAllByTestId, debug} = render(<LocalCoordinateInputView {...propsMock} />)

            const subfields = getAllByTestId('inputSubfield')

            await userEvent.type(subfields[0], '10', {submitEditing: true})
            await userEvent.type(subfields[1], '11', {submitEditing: true})
            await userEvent.type(subfields[2], '12', {submitEditing: true})

            expect(SaveLatitudeMock).toBeCalledTimes(6)
        })

        it('Calls SaveLongitude', async() => {
            const propsMock: LocalCoordinateInputViewProps = {
                SaveLatitude: jest.fn(), 
                SaveLongitude: jest.fn(),
            }

            const {getAllByTestId} = render(<LocalCoordinateInputView {...propsMock} />)

            const subfields = getAllByTestId('inputSubfield')

            await userEvent.type(subfields[3], '10', {submitEditing: true})
            await userEvent.type(subfields[4], '11', {submitEditing: true})
            await userEvent.type(subfields[5], '12', {submitEditing: true})

            expect(propsMock.SaveLongitude).toBeCalledTimes(6)
        })

        it('Calls save function without submitting', async() => {
            const propsMock: LocalCoordinateInputViewProps = {
                SaveLatitude: jest.fn(), 
                SaveLongitude: jest.fn(),
            }

            const {getAllByTestId} = render(<LocalCoordinateInputView {...propsMock} />)

            const subfields = getAllByTestId('inputSubfield')

            await userEvent.type(subfields[0], '10')
            await userEvent.type(subfields[1], '11')
            await userEvent.type(subfields[2], '12')

            await userEvent.type(subfields[3], '20')
            await userEvent.type(subfields[4], '21')
            await userEvent.type(subfields[5], '22')

            expect(propsMock.SaveLatitude).toBeCalledTimes(3)
            expect(propsMock.SaveLongitude).toBeCalledTimes(3)
        })
    })
})