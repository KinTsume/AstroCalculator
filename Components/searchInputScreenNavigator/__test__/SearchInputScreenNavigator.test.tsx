import {describe, it, expect} from '@jest/globals';
import { render, renderHook, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'

import useSearchInputScreenNavigator from '../useSearchInputScreenNavigator';
import { CatalogueObject } from '../../catalogueObjectCard/CatalogueObjectCard';

import { DARK } from '../../../assets/ColorPalettes';

const Sirius: CatalogueObject = {
    Names: ['Sirius', '9 Canis Majoris'],
    HD_ID: 48915,
    RA: 6.752806,
    DE: -16.68694,
    PhotovisualMagnitude: -1.58,
    SpectralType: 'A0',
    ThemeColors: DARK.SearchInputScreen
}

const Vega: CatalogueObject = {
    Names: ['Vega'],
    HD_ID: 172167,
    RA: 18.615972,
    DE: 38.76861,
    PhotovisualMagnitude: -1.58,
    SpectralType: 'A0',
    ThemeColors: DARK.SearchInputScreen
}

describe('SearchInputScreenNavigator', () => {
    describe('Logic', () => {
        it('returns the result RA', () => {

            const { result } = renderHook(useSearchInputScreenNavigator)

            act(() => {

                result.current.ChangeSelectedCard('origin')
                result.current.ChangeObject(Vega)

                result.current.ChangeSelectedCard('target')
                result.current.ChangeObject(Sirius)
            })

            expect(result.current.resultRA).toStrictEqual([-11, 51, 47.4])
        })

        it('returns the result DE', () => {
            
            const { result } = renderHook(useSearchInputScreenNavigator)

            act(() => {
                result.current.ChangeSelectedCard('origin')
                result.current.ChangeObject(Vega)

                result.current.ChangeSelectedCard('target')
                result.current.ChangeObject(Sirius)
            })

            expect(result.current.resultDE).toStrictEqual([-55, 27, 19.98])
        })
    })
})