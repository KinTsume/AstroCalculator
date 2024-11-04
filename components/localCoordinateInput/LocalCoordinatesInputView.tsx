import { View, Text, TextInput, useColorScheme } from "react-native";
import CoordinateInputField, { InputFieldProps } from "../coordinateInputField/CoordinateInputField";
import {DARK, LIGHT} from "../../assets/ColorPalettes";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { positionStorage } from "./useLocalCoordinateInput";

export interface LocalCoordinateInputViewProps {
    SaveLatitude: (value: string[]) => void,
    SaveLongitude: (value: string[]) => void,
    GetGeolocation: () => void, 
    latitude: number, 
    longitude: number,
}

const LocalCoordinateInputView = (props: LocalCoordinateInputViewProps) => {

    const isDarkMode = useColorScheme() === 'dark'

    const theme = isDarkMode ? DARK : LIGHT
    const themeColors = theme.SearchInputScreen

    const latitudeProps: InputFieldProps = {
        fieldUnits: ['º', "'", "''"],
        unitsMaxValue: [90, 60, 60],
        themeColors: theme.ManualInputScreen,
        SaveCallback: props.SaveLatitude
    } 

    const longitudeProps: InputFieldProps = {
        fieldUnits: ['º', "'", "''"],
        unitsMaxValue: [180, 60, 60],
        themeColors: theme.ManualInputScreen,
        SaveCallback: props.SaveLongitude
    } 

    return (
        <View>
            <IconButton testID='gpsFillButton' icon='map-marker-radius-outline' size={50} iconColor={themeColors.Icons} 
                onPress={() => {
                    props.GetGeolocation()
                }
            }/>

            <Text>Enter your latitude</Text>
            <CoordinateInputField {...latitudeProps}/>
            <Text>Enter your longitude</Text>
            <CoordinateInputField {...longitudeProps}/>
            <Text>Current location:</Text>
            <Text>Latitude: {props.latitude}</Text>
            <Text>Longitude: {props.longitude}</Text>
        </View>
    )
}

export default LocalCoordinateInputView