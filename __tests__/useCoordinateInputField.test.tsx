import {TextInput} from 'react-native'
import React from 'react';
import useCoordinateInputField from "../Components/CoordinateInputField/useCoordinateInputField";
import CoordinateInputField from '../components/coordinateInputField/CoordinateInputField';
import { fireEvent, render } from "@testing-library/react-native"

import {describe, it, expect} from '@jest/globals';
import { Text } from 'react-native-reanimated/lib/typescript/Animated';

const {ReferenceComponent} = useCoordinateInputField()

describe("Reference tests", () => {
    it("Should populate the array with 5 refs", () => {

        //Arange
        let references: Array<TextInput> = []
        const component1 = React.createRef<TextInput>().current
        const component2 = React.createRef<TextInput>().current
        const component3 = React.createRef<TextInput>().current
        const component4 = React.createRef<TextInput>().current
        const component5 = React.createRef<TextInput>().current

        console.log(component1)

        //Act
        references = ReferenceComponent(references, component1)
        references = ReferenceComponent(references, component2)
        references = ReferenceComponent(references, component3)
        references = ReferenceComponent(references, component4)
        references = ReferenceComponent(references, component5)

        //Assert
        expect(references.length).toBe(5)
    })

    it("Should populate the array with the correct order", () => {

        //Arange
        let references: Array<TextInput> = []
        const component1 = React.createRef<TextInput>().current
        const component2 = React.createRef<TextInput>().current
        const component3 = React.createRef<TextInput>().current

        //Act
        references = ReferenceComponent(references, component1)
        references = ReferenceComponent(references, component2)
        references = ReferenceComponent(references, component3)

        //Assert
        expect(references[0]).toBe(component1)
        expect(references[1]).toBe(component2)
        expect(references[2]).toBe(component3)
    })

    it("Should return the array before the null component", () => {
        //Arange
        let references: Array<TextInput> = []
        const component1 = React.createRef<TextInput>().current as TextInput
        const component2 = React.createRef<TextInput>().current as TextInput
        const component3 = React.createRef<TextInput>().current as TextInput

        const nonNullReferences: Array<TextInput> = [component1, component2, component3]

        const componentNull = null

        //Act
        references = ReferenceComponent(references, component1)
        references = ReferenceComponent(references, component2)
        references = ReferenceComponent(references, component3)

        references = ReferenceComponent(references, componentNull)

        //Assert
        expect(references).toBe(references)
    })
})