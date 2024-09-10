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
    it('Renders manual input screen', async() => {
        const{getByTestId, getByText} = render(
            <NavigationContainer>
                <AppNavigator/>
            </NavigationContainer>
        )

        const button = getByText('Manual Input')
        await userEvent.press(button)

        await waitFor(() => {
            expect(() => getByTestId('ManualInputScreen')).toBeTruthy()
        })
        //expect(element).toBeTruthy()
    })

    it('Renders search input screen', async() => {
        const{getByTestId, getByText} = render(
            <NavigationContainer>
                <AppNavigator/>
            </NavigationContainer>
        )

        const button = getByText('Search Input')
        await userEvent.press(button)

        await waitFor(() => {
            expect(() => getByTestId('SearchInputScreen')).toBeTruthy()
        })
    })

    it('Renders options screen', async() => {
        const{getByTestId, getByText} = render(
            <NavigationContainer>
                <AppNavigator/>
            </NavigationContainer>
        )

        const button = getByText('Options')
        await userEvent.press(button)

        await waitFor(() => {
            expect(() => getByTestId('OptionsScreen')).toBeTruthy()
        })
    })
    it("Renders the icons", () => {
        const{getAllByTestId, getByText} = render(
            <NavigationContainer>
                <AppNavigator/>
            </NavigationContainer>
        )

        const icon = getAllByTestId("navIcon")

        expect(icon).toBeTruthy()
    })
})