import {describe, it, expect} from '@jest/globals';
import { render, renderHook, userEvent } from '@testing-library/react-native';

import { DARK } from '../../../assets/ColorPalettes';
import ManualInputScreen from '../ManualInputScreen';

describe('ManualInputScreen', () => {
    it('Renders two ManualInputFields', () => {
        const{getAllByTestId} = render(<ManualInputScreen/>)

        const elements = getAllByTestId('ManualInputField')

        expect(elements.length).toBe(2)
    })

    it('Renders a hour angle ManualInputField', () => {
        const{queryByText} = render(<ManualInputScreen/>)

        const element = queryByText('Origin hour angle')

        expect(element).toBeTruthy()
    })

    it('Renders a declination ManualInputField', () => {
        const{queryByText} = render(<ManualInputScreen/>)

        const element = queryByText('Origin declination')

        expect(element).toBeTruthy()
    })
})