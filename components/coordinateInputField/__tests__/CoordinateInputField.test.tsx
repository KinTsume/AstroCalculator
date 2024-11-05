
import {describe, it, expect} from '@jest/globals';
import { render, userEvent, waitFor } from '@testing-library/react-native';
import CoordinateInputField, { InputFieldProps } from '../CoordinateInputField';

import { DARK } from '../../../assets/ColorPalettes';

const props: InputFieldProps = {
    themeColors: DARK.ManualInputScreen,
    unitsMaxValue: [24, 60, 60],
    fieldUnits: ['h', 'm', 's'],
    SaveCallback: (value: string[]) => {},
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

    it('Corrects the input subfields after entering a number beyond the unit limit', async() => {
        const {getAllByTestId} = render(<CoordinateInputField {...props}/>)

        const elements = getAllByTestId('inputSubfield')
        const firstElement = elements[0]
        const secondElement = elements[1]
        const thirdElement = elements[2]

        await waitFor(async() => {
            
            await userEvent.type(firstElement, '25')
            await userEvent.type(secondElement, '100')
            await userEvent.type(thirdElement, '100')
        })

        const firstParsedValue = parseInt(firstElement.props.value)
        const secondParsedValue = parseInt(secondElement.props.value)
        const thirdParsedValue = parseInt(thirdElement.props.value)

        expect(firstParsedValue).toBe(props.unitsMaxValue[0] - 1)
        expect(secondParsedValue).toBe(props.unitsMaxValue[1] - 1)
        expect(thirdParsedValue).toBe(props.unitsMaxValue[2] - 1)
    })

    it('Corrects the input subfields after entering a number lower than the unit limit', async() => {
        const {getAllByTestId} = render(<CoordinateInputField {...props}/>)

        const elements = getAllByTestId('inputSubfield')

        const firstElement = elements[0]
        const secondElement = elements[1]
        const thirdElement = elements[2]

        await waitFor(async() => {
            await userEvent.type(firstElement, '-25')
            await userEvent.type(secondElement, '-100')
            await userEvent.type(thirdElement, '-100')
        })
        
        const firstParsedValue = parseInt(firstElement.props.value)
        const secondParsedValue = parseInt(secondElement.props.value)
        const thirdParsedValue = parseInt(thirdElement.props.value)

        expect(firstParsedValue).toBe(-props.unitsMaxValue[0] + 1)
        expect(secondParsedValue).toBe(-props.unitsMaxValue[1] + 1)
        expect(thirdParsedValue).toBe(-props.unitsMaxValue[2] + 1)
    })
})