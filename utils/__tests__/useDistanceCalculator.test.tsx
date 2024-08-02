import {describe, it, expect} from '@jest/globals';
import { render, renderHook, userEvent } from '@testing-library/react-native';

import useDistanceCalculator from '../useDistanceCalculator';

let originPoint: number[] = [18, 36, 56.33]
let targetPoint: number[] = [6, 45, 8.91]

describe('useDistanceCalculator', () => {
    it('Returns the distance between origin and tagert points', () => {
        const { result } = renderHook(() => useDistanceCalculator())

        const distance = result.current.CalculateDistance(originPoint, targetPoint)

        expect(distance).toStrictEqual([-11, -51, -47.42])
    })
})
