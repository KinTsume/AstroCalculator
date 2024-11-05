import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { render, renderHook, userEvent } from '@testing-library/react-native';
import useManualInputField, { ManualInputFieldProps } from '../useManualInputField';
import ManualInputFieldView from '../ManualInputFieldView';

import { DARK } from '../../../assets/ColorPalettes';
import ManualInputField from '../ManualInputField';
import AppConfig from '../../../assets/AppConfig';

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

            result.current.SaveOrigin(['20', '20', '20'])

            const roundedCoord = Math.round(20.338888889 * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision


            expect(result.current.originInput.current).toBe(roundedCoord)
        })

        it('Saves the target coordinate', () => {
            const{ result } = renderHook(() => useManualInputField(props))

            result.current.SaveTarget(['30', '10', '30'])

            const roundedCoord = Math.round(30.175 * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision

            expect(result.current.targetInput.current).toBe(roundedCoord)
        })

        it('Returns the calculated distance', () => {
            const{ result } = renderHook(() => useManualInputField(props))
    
            result.current.SaveOrigin(['20', '20', '20'])
            result.current.SaveTarget(['30', '10', '30'])
            const distance = result.current.CalculateDistanceInDegrees()

            const roundedOriginValue = Math.round(20.338888889 * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision
            const roundedTargetValue = Math.round(30.175 * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision

            const roundedDistance = roundedTargetValue - roundedOriginValue

            const degrees = Math.trunc(roundedDistance)
            
            const rawMinutes = (roundedDistance - degrees) * 60
            const minutes = Math.trunc(rawMinutes)
            
            const seconds = (rawMinutes - Math.trunc(minutes)) * 60

            const roundedSeconds = Math.round(seconds * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision

            expect(distance).toStrictEqual([degrees, minutes, roundedSeconds])
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
