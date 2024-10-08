import {describe, it, expect} from '@jest/globals';
import { renderHook } from '@testing-library/react-native';

import useAngleRepresentationUtility from '../useAngleRepresentationUtility';
import AppConfig from '../../assets/AppConfig';

describe('useAngleRepresentationUtility', () => {
    it('Returns an array representation', () => {
        const { result } = renderHook(() => useAngleRepresentationUtility())

        const array = result.current.convertToArrayRepresentation(-55.4998)

        const roundedValue = Math.round(59.28 * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision

        expect(array).toStrictEqual([-55, 29, roundedValue])
    })
    it('Returns a decimal representation', () => {
        const { result } = renderHook(() => useAngleRepresentationUtility())

        const decimalValue = result.current.convertToDecimalRepresentation([-55, 29, 59.28])

        const roundedValue = Math.round(-55.4998 * AppConfig.angleConvertionPrecision) / AppConfig.angleConvertionPrecision

        expect(decimalValue).toBe(roundedValue)
    })
    it('Returns an error', () => {
        const { result } = renderHook(() => useAngleRepresentationUtility())

        expect(() => {
            result.current.convertToDecimalRepresentation([-55, -29, -59.28])
        }).toThrowError()
    })
})
