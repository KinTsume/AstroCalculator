import { View, Text, TextInput, useColorScheme } from "react-native";
import CoordinateInputField, { InputFieldProps } from "../coordinateInputField/CoordinateInputField";
import {DARK, LIGHT} from "../../assets/ColorPalettes";
import { IconButton } from "react-native-paper";

interface LocalCoordinateInputViewProps {
    SaveCoordinates: () => void
}

const LocalCoordinateInputView = (props: LocalCoordinateInputViewProps) => {

    const isDarkMode = useColorScheme() === 'dark'

    const theme = isDarkMode ? DARK : LIGHT
    const themeColors = theme.SearchInputScreen

    const latitudeProps: InputFieldProps = {
        fieldUnits: ['º', "'", "''"],
        unitsMaxValue: [90, 60, 60],
        saveIndex: 0,
        themeColors: theme.ManualInputScreen,
        SaveCoordinates: () => {}
    } 

    const longitudeProps: InputFieldProps = {
        fieldUnits: ['º', "'", "''"],
        unitsMaxValue: [180, 60, 60],
        saveIndex: 0,
        themeColors: theme.ManualInputScreen,
        SaveCoordinates: () => {}
    } 

    return (
        <View>
            <IconButton testID='gpsFillButton' icon='map-marker-radius-outline' size={50} iconColor={themeColors.Icons} 
                onPress={() => {
                    
            }}/>

            <Text>Enter your latitude</Text>
            <CoordinateInputField {...latitudeProps}/>
            <Text>Enter your longitude</Text>
            <CoordinateInputField {...longitudeProps}/>
        </View>
    )
}

export default LocalCoordinateInputView