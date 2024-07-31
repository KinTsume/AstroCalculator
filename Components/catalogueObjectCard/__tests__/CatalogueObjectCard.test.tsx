import {describe, it, expect} from '@jest/globals';
import { render, renderHook, userEvent } from '@testing-library/react-native';

import CatalogueObjectCard, { CatalogueObjectCardProps } from '../CatalogueObjectCard';

import { DARK } from '../../../assets/ColorPalettes';


import getSpectralTypeColors from '../getSpectralTypeColor';
import getPhotovisualMagnitudeSize from '../getPhotovisualMagnitudeSize';

let props: CatalogueObjectCardProps = {
    Names: ['Sirius', '9 Canis Majoris'],
    HD_ID: 48915,
    RA: [6, 45, 10.1],
    DE: [-16, 41, 13],
    PhotovisualMagnitude: -1.58,
    SpectralType: 'A0',
    ThemeColors: DARK.SearchInputScreen
}

describe('CatalogueObjectCard', () => {
    it('Renders the icon', () => {
        const{queryByTestId} = render(<CatalogueObjectCard {...props}/>)

        const element = queryByTestId('CatalogueObjectCardIcon')

        expect(element).toBeTruthy();
    })

    it('Sets the icon color according to the spectral type value', () => {
        props.SpectralType = 'F'
        const{debug, getByTestId} = render(<CatalogueObjectCard {...props}/>)

        const element = getByTestId('CatalogueObjectCardIcon')

        const color = element.props.style[0].color

        expect(color).toBe('#FFFFE0');
    })

    it('Sets the icon size according to the photovisual magnitude', () => {
        props.PhotovisualMagnitude = 2.5
        const{getByTestId} = render(<CatalogueObjectCard {...props}/>)

        const element = getByTestId('CatalogueObjectCardIcon')

        const size = element.props.style[0].fontSize

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
        const{debug,queryByText} = render(<CatalogueObjectCard {...props}/>)
        debug()
        let declination = '-16º, 41\', 13"'
        const element = queryByText('Declination: ' + declination)

        expect(element).toBeTruthy();
    })
})