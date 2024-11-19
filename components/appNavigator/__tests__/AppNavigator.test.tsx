import {describe, it, expect, beforeEach, afterEach, jest} from '@jest/globals';
import { render, renderHook, userEvent, waitFor, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'

import { DARK } from '../../../assets/ColorPalettes';
import AppNavigator from '../AppNavigator';

beforeEach(() => {
    jest.useFakeTimers()
})

afterEach(() => {
    jest.useRealTimers()
})

describe('AppNavigator', () => {

    it('Renders search input screen', () => {
        const{queryByTestId, getByText} = render(
            <NavigationContainer>
                <AppNavigator/>
            </NavigationContainer>
        )

        const button = getByText('Search Input')

        waitFor(() => {
            userEvent.press(button)
        })
        .then(() => {
            const searchInputScreen = queryByTestId('SearchInputScreen')
            expect(searchInputScreen).toBeTruthy()
        })
    })

    it('Renders options screen', () => {
        const{queryByTestId, getByText} = render(
            <NavigationContainer>
                <AppNavigator/>
            </NavigationContainer>
        )

        const button = getByText('Options')

        waitFor(() => {
            userEvent.press(button)
        })
        .then(() => {
            const optionsScreen = queryByTestId('OptionsScreen')
            expect(optionsScreen).toBeTruthy()
        })
    })
    it("Renders the icons", () => {
        const{queryAllByTestId} = render(
            <NavigationContainer>
                <AppNavigator/>
            </NavigationContainer>
        )

        const icon = queryAllByTestId("navIcon")

        expect(icon.length).toBe(2*2) //It generates a second copy for each icon, so the test should search for doubled icons 
    })
})