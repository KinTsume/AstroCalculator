import {describe, it, expect} from '@jest/globals';
import { render, renderHook, userEvent } from '@testing-library/react-native';

import { DARK } from '../../../assets/ColorPalettes';
import AppNavigator from '../AppNavigator';

describe('AppNavigator', () => {
    it('Renders manual input screen', () => {
        const{getByTestId, debug} = render(<AppNavigator/>)

        debug()

        const element = getByTestId('ManualInputScreen')

        expect(element).toBeTruthy()
    })

    it('Renders search input screen', () => {
        const{getByTestId} = render(<AppNavigator/>)

        const element = getByTestId('SearchInputScreen')

        expect(element).toBeTruthy()
    })

    it('Renders options screen', () => {
        const{getByTestId} = render(<AppNavigator/>)

        const element = getByTestId('OptionsScreen')

        expect(element).toBeTruthy()
    })
})