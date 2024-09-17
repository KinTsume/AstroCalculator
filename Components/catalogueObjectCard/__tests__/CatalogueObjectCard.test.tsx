import {describe, it, expect} from '@jest/globals';
import { render, renderHook, userEvent } from '@testing-library/react-native';

import CatalogueObjectCard, { CatalogueObject } from '../CatalogueObjectCard';

import { DARK } from '../../../assets/ColorPalettes';

import getSpectralTypeColors from '../getSpectralTypeColor';
import getPhotovisualMagnitudeSize from '../getPhotovisualMagnitudeSize';
import { ReactTestInstance } from 'react-test-renderer';

let props: CatalogueObject = {
    Names: ['Sirius', '9 Canis Majoris'],
    HD_ID: 48915,
    RA: 6.752806,
    DE: -16.68694,
    PhotovisualMagnitude: -1.58,
    SpectralType: 'A0',
    ThemeColors: DARK.SearchInputScreen
}

describe('CatalogueObjectCard', () => {
    it('Renders the icon', () => {
        const{queryByTestId, debug} = render(<CatalogueObjectCard {...props}/>)

        debug()

        const element = queryByTestId('CatalogueObjectCardIcon')

        expect(element).toBeTruthy();
    })

    it('Sets the icon color according to the spectral type value', () => {
        props.SpectralType = 'F'
        const{getByTestId, debug} = render(<CatalogueObjectCard {...props}/>)

        const element = getByTestId('CatalogueObjectCardIcon').children[0] as ReactTestInstance

        const color = element.props.color

        expect(color).toBe('#FFFFE0');
    })

    it('Sets the icon size according to the photovisual magnitude', () => {
        props.PhotovisualMagnitude = 2.5
        const{getByTestId} = render(<CatalogueObjectCard {...props}/>)

        const element = getByTestId('CatalogueObjectCardIcon').children[0] as ReactTestInstance

        const size = element.props.size

        expect(size).toBe(50);
    })

    it('Sets the Name field', () => {
        const{queryByText} = render(<CatalogueObjectCard {...props}/>)

        const element = queryByText('Names: ' + props.Names[0] + ', ' + props.Names[1])

        expect(element).toBeTruthy();
    })

    it('Sets the Id field', () => {
        const{queryByText} = render(<CatalogueObjectCard {...props}/>)

        const element = queryByText('HD ID: ' + props.HD_ID)

        expect(element).toBeTruthy();
    })

    it('Sets the Right ascension field', () => {
        const{queryByText} = render(<CatalogueObjectCard {...props}/>)

        let rightAscension = '6h, 45m, 10.1s'

        const element = queryByText('Right ascension: ' + rightAscension)

        expect(element).toBeTruthy();
    })

    it('Sets the Declination field', () => {
        const{queryByText} = render(<CatalogueObjectCard {...props}/>)
        let declination = `-16º, 41', 12.98"`
        const element = queryByText('Declination: ' + declination)

        expect(element).toBeTruthy();
    })
})