import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { render, renderHook, userEvent } from '@testing-library/react-native';

import LocalCoordinateInput from '../LocalCoordinateInput';

describe('LocalCoordinateInput', () => {
    describe('Logic', () => {

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