import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { render, renderHook, userEvent } from '@testing-library/react-native';
import useManualInputField, { ManualInputFieldProps } from '../useManualInputField';
import ManualInputFieldView from '../ManualInputFieldView';

import { DARK } from '../../../assets/ColorPalettes';
import ManualInputField from '../ManualInputField';

const props: ManualInputFieldProps = {
    themeColors: DARK.ManualInputScreen,
    fieldName: 'declination',
    fieldUnits: ['º', '´', '´´'],
    unitsMaxValue: [360, 60, 60],
    style: {}
}

beforeEach(() => {
    jest.useFakeTimers()
})

afterEach(() => {
    jest.useRealTimers()
})

describe('ManualInputField', () => {
    describe('Logic', () => {
        it('Saves the origin coordinate', () => {
            const{ result } = renderHook(() => useManualInputField(props))

            result.current.SaveValues(0, ['20', '20', '20'])

            expect(result.current.originInput.current).toBe(20.34)
        })

        it('Saves the target coordinate', () => {
            const{ result } = renderHook(() => useManualInputField(props))

            result.current.SaveValues(1, ['30', '10', '30'])

            expect(result.current.targetInput.current).toBe(30.18)
        })

        it('CalculateDistanceInDegrees returns an array', () => {
            const{ result } = renderHook(() => useManualInputField(props))
    
            result.current.SaveValues(0, ['20', '20', '20'])
            result.current.SaveValues(1, ['30', '10', '30'])
            const distance = result.current.CalculateDistanceInDegrees()
    
            expect(distance).toStrictEqual([9, 50, 24])
        })
    })
    
    describe('View', () => {
        it('Sets origin field name correctly', () => {
            const testFieldName = 'testField'
            props.fieldName = testFieldName
            const{queryByText, debug} = render(<ManualInputField {...props}/>)
            
            const element = queryByText('Origin ' + testFieldName)
    
            expect(element).toBeTruthy()
        })
    
        it('Sets target field name correctly', () => {
            const testFieldName = 'testField'
            props.fieldName = testFieldName
            const{queryByText} = render(<ManualInputField {...props}/>)
    
            const element = queryByText('Target ' + testFieldName)
    
            expect(element).toBeTruthy()
        })
    
        it('Sets result correctly', async() => {
            const SaveValues = (index: number, values: string[]) => {}
            const CalculateDistance = () => {return([10, 20, 30])}
            userEvent.setup()
            const{ getByText, getByTestId } = render(<ManualInputFieldView {...props} SaveValues={SaveValues} CalculateDistanceInDegrees={CalculateDistance} />)
    
            const submitButton = getByTestId('submitButton')
            await userEvent.press(submitButton)
            
            const textQuery = 'Result: '+ '10' + props.fieldUnits[0] + '20' + props.fieldUnits[1] + '30' + props.fieldUnits[2]
            const element = getByText(textQuery)
    
            expect(element).toBeTruthy
        })
    })
})
