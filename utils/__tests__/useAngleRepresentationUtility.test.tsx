import {describe, it, expect} from '@jest/globals';
import { renderHook } from '@testing-library/react-native';

import useAngleRepresentationUtility from '../useAngleRepresentationUtility';

describe('useAngleRepresentationUtility', () => {
    it('Returns an array representation', () => {
        const { result } = renderHook(() => useAngleRepresentationUtility())

        const array = result.current.convertToArrayRepresentation(-55.4998)

        expect(array).toStrictEqual([-55, 29, 59.28])
    })
    it('Returns a decimal representation', () => {
        const { result } = renderHook(() => useAngleRepresentationUtility())

        const array = result.current.convertToDecimalRepresentation([-55, 29, 59.28])

        expect(array).toStrictEqual(-55.4998)
    })
    it('Returns an error', () => {
        const { result } = renderHook(() => useAngleRepresentationUtility())

        expect(() => {
            result.current.convertToDecimalRepresentation([-55, -29, -59.28])
        }).toThrowError()
    })
})
