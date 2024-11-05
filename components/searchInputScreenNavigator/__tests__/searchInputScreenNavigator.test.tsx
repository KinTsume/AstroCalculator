import {describe, it, expect} from '@jest/globals';
import { render, renderHook, userEvent, waitFor } from '@testing-library/react-native';

import { CatalogueObject } from '../../catalogueObjectCard/CatalogueObjectCard';
import useSearchInputScreenNavigator from '../useSearchInputScreenNavigator';

import { DARK } from '../../../assets/ColorPalettes';

const Vega: CatalogueObject = {
    Names: ['Vega', 'alf Lyr', '3 Lyr'],
    HD_ID: 172167,
    RA: 18.615972,
    DE: 38.76861,
    PhotovisualMagnitude: 0.14,
    SpectralType: 'A0',
}

const Sirius: CatalogueObject = {
    Names: ['Sirius', 'Dog Star', 'Sirius A'],
    HD_ID: 48915,
    RA: 6.752806,
    DE: -16.68694,
    PhotovisualMagnitude: -1.58,
    SpectralType: 'A0',
}

describe('SearchInputScreen', () => {
    describe('Logic', () => {
        it('Changes origin object to Vega', () => {
            const{result} = renderHook(() => useSearchInputScreenNavigator())

            waitFor(() => {
                result.current.SetObject(Vega, 'origin')
            })
            .then(() => {
                const originObject = result.current.originObject

                expect(originObject).toBe(Vega)
            })
        })
        it('Changes origin object to Sirius', () => {
            const{result} = renderHook(() => useSearchInputScreenNavigator())

            waitFor(() => {
                result.current.SetObject(Sirius, 'target')
            })
            .then(() => {
                const targetObject = result.current.targetObject

                expect(targetObject).toBe(Sirius)
            })
        })
    })
})