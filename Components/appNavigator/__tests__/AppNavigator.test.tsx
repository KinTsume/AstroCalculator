import {describe, it, expect} from '@jest/globals';
import { render, renderHook, userEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'

import { DARK } from '../../../assets/ColorPalettes';
import AppNavigator from '../AppNavigator';

describe('AppNavigator', () => {
    it('Renders manual input screen', async() => {
        const{getByTestId, getByText, debug} = render(
            <NavigationContainer>
                <AppNavigator/>
            </NavigationContainer>
        )

        debug()
        const button = getByText('Manual Input')
        await userEvent.press(button)
        const element = getByTestId('ManualInputScreen')

        expect(element).toBeTruthy()
    })

    it('Renders search input screen', async() => {
        const{getByTestId, getByText} = render(
            <NavigationContainer>
                <AppNavigator/>
            </NavigationContainer>
        )

        const button = getByText('Search Input')
        await userEvent.press(button)
        const element = getByTestId('SearchInputScreen')

        expect(element).toBeTruthy()
    })

    it('Renders options screen', async() => {
        const{getByTestId, getByText} = render(
            <NavigationContainer>
                <AppNavigator/>
            </NavigationContainer>
        )

        const button = getByText('Options')
        await userEvent.press(button)
        const element = getByTestId('OptionsScreen')

        expect(element).toBeTruthy()
    })
})