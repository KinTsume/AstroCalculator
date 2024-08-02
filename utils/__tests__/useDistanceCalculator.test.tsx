import {describe, it, expect} from '@jest/globals';
import { render, renderHook, userEvent } from '@testing-library/react-native';

import useCalculateDistance from '../useCalculateDistance';

let originPoint: number[] = [18, 36, 56.33]
let targetPoint: number[] = [6, 45, 8.91]

describe('useCalculateDistance', () => {
    it('Returns the distance between origin and target points', () => {
        const { result } = renderHook(() => useCalculateDistance())

        const distance = result.current.CalculateDistance(originPoint, targetPoint)

        expect(distance).toStrictEqual([-11, -51, -47.42])
    })
})
