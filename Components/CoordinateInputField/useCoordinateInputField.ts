import { TextInput, Text, View, StyleSheet } from 'react-native'

import { ManualInputScreenColors } from '../../assets/ColorPalettes'

export interface InputFieldProps{
    themeColors: ManualInputScreenColors,
    style: any,
    textInfo: string[],
    orderNum: number,
    SaveValues: (index: number, value: string) => void
}

const useCoordinateInputField = (props: InputFieldProps) => {
    let componentsReference: Array<TextInput> = []

    const ReferenceComponent = (component: TextInput | null, orderNum: number) => {
        if(component)
        {
            componentsReference[orderNum] = component;
            console.log("Saving reference nº: " + orderNum)
            console.log("References count: " + componentsReference.length)
        }
    }

    const FocusComponent = (componentOrderNum: number) => {
        if((componentOrderNum + 1) < componentsReference.length){
            try{
                componentsReference[componentOrderNum + 1].focus()
            }
            catch(e){
                console.log(componentOrderNum + 1)
                console.log(componentsReference[componentOrderNum + 1])
            }
        }
    }

    
}

export default useCoordinateInputField
