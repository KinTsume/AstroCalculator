
import {describe, it, expect} from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import CoordinateInputField, { InputFieldProps } from '../CoordinateInputField';

import { DARK } from '../../../assets/ColorPalettes';

const props: InputFieldProps = {
    themeColors: DARK.ManualInputScreen,
    style: {},
    unitsMaxValue: [24, 60, 60],
    fieldUnits: ['h', 'm', 's'],
    saveIndex: 0,
    SaveValues: (index: number, value: string[]) => {},
}

describe('CoordinateInputField', () => {
    it('Renders three input subfields', () => {
        const {getAllByTestId} = render(<CoordinateInputField {...props}/>)
        
        const elements = getAllByTestId('inputSubfield')

        expect(elements.length).toBe(3)
    })

    it('renders input subfields with "0" placeholders', () => {
        const {getAllByPlaceholderText} = render(<CoordinateInputField {...props}/>)
        
        const twoCharacterElements = getAllByPlaceholderText('00')
        const threeCharacterElements = getAllByPlaceholderText('000')

        expect(twoCharacterElements.length).toBe(2)
        expect(threeCharacterElements.length).toBe(1)
    })

    it('Renders three subfieldTexts', () => {
        const {getAllByTestId} = render(<CoordinateInputField {...props}/>)
        
        const elements = getAllByTestId('inputSubfieldText')

        expect(elements.length).toBe(3)
    })

    it('Renders subfieldTexts matching the fieldUnits prop', () => {
        const {getByText} = render(<CoordinateInputField 
            {...props} 
            fieldUnits={['A', 'B', 'C']}
            />
        )
        
        const firstElement = getByText('A')
        const secondElement = getByText('B')
        const thirdElement = getByText('C')

        expect(firstElement).toBeTruthy()
        expect(secondElement).toBeTruthy()
        expect(thirdElement).toBeTruthy()
    })

    it('Corrects the input subfields after entering a number beyond the unit maximum limit', () => {
        const {getAllByTestId, debug} = render(<CoordinateInputField {...props}/>)

        const firstElement = getAllByTestId('inputSubfield')[0]
        const secondElement = getAllByTestId('inputSubfield')[1]
        const thirdElement = getAllByTestId('inputSubfield')[2]
        fireEvent.changeText(firstElement, '25')
        fireEvent.changeText(secondElement, '100')
        fireEvent.changeText(thirdElement, '100')
        const firstParsedValue = parseInt(firstElement.props.value)
        const secondParsedValue = parseInt(secondElement.props.value)
        const thirdParsedValue = parseInt(thirdElement.props.value)

        expect(firstParsedValue).toBe(props.unitsMaxValue[0] - 1)
        expect(secondParsedValue).toBe(props.unitsMaxValue[1] - 1)
        expect(thirdParsedValue).toBe(props.unitsMaxValue[2] - 1)
    })
})