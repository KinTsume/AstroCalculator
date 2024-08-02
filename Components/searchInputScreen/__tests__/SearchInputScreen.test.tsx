import {describe, it, expect} from '@jest/globals';
import { render, renderHook, userEvent } from '@testing-library/react-native';

import SearchInputScreen from '../SearchInputScreen';
import { SearchInputScreenProps } from '../SearchInputScreen';

import { CatalogueObjectCardProps } from '../../catalogueObjectCard/CatalogueObjectCard';

import { DARK } from '../../../assets/ColorPalettes';

const originObject: CatalogueObjectCardProps = {
    Names: ['Vega', 'alf Lyr', '3 Lyr'],
    HD_ID: 172167,
    RA: [18, 36, 56.33],
    DE: [+38, 47, 1.28],
    PhotovisualMagnitude: 0.14,
    SpectralType: 'A0',
    ThemeColors: DARK.SearchInputScreen
}

const targetObject: CatalogueObjectCardProps = {
    Names: ['Sirius', 'Dog Star', 'Sirius A'],
    HD_ID: 48915,
    RA: [6, 45, 8.91],
    DE: [-16, 42, 58.01],
    PhotovisualMagnitude: -1.58,
    SpectralType: 'A0',
    ThemeColors: DARK.SearchInputScreen
}

let props: SearchInputScreenProps = {
    OriginObject: originObject,
    TargetObject: targetObject,
    ResultRA: [-11, 51, 47.42],
    ResultDE: [-55, 29, 59.29]
}

describe('SearchInputScreen', () => {
    it('Renders 2 CatalogueObjectCards', () => {
        const{ getAllByTestId } = render(<SearchInputScreen {...props}/>)

        const result = getAllByTestId('CatalogueObjectCard')

        expect(result.length).toBe(2)
    })

    it('Renders 2 search icons', () => {
        const{ getAllByTestId } = render(<SearchInputScreen {...props}/>)

        const result = getAllByTestId('SearchIcon')

        expect(result.length).toBe(2)
    })

    it('Show the relative right ascension', () => {
        const{ getByText } = render(<SearchInputScreen {...props}/>)

        const result = getByText('RA: -11h 51m 47.42s')

        expect(result).toBeTruthy()
    })

    it('Show the relative declination', () => {
        const{ getByText } = render(<SearchInputScreen {...props}/>)

        const result = getByText('DE: -55º 29\' 59.29"')

        expect(result).toBeTruthy()
    })  
})