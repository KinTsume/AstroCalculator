import {describe, it, expect} from '@jest/globals';
import { renderHook } from '@testing-library/react-native';

import useCalculateDistance from '../useCalculateDistance';

//let originPoint: number[] = [18, 36, 56.33]
//let targetPoint: number[] = [6, 45, 8.91]

let originPoint: number[] = [+38, 47, 1.28]
let targetPoint: number[] = [-16, 42, 58.01]

describe('useCalculateDistance', () => {
    it('Returns the distance between origin and target points', () => {
        const { result } = renderHook(() => useCalculateDistance())

        const distance = result.current.CalculateDistance(originPoint, targetPoint)

        expect(distance).toStrictEqual([-55, -29, -59.29])
    })
})
