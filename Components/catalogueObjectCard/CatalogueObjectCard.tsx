import { View, Text, StyleSheet } from "react-native"
import Ionicons from "react-native-ionicons";
import { Icon } from "react-native-paper";
import { SearchInputScreenColors } from "../../assets/ColorPalettes";

import getSpectralTypeColors from "./getSpectralTypeColor";
import getMagnitudeSize from "./getPhotovisualMagnitudeSize";

import useAngleRepresentationUtility from "../../utils/useAngleRepresentationUtility";

export interface CatalogueObject {
    Names: string[],
    HD_ID: number,
    RA: number,
    DE: number,
    PhotovisualMagnitude: number,
    SpectralType: string,
    ThemeColors: SearchInputScreenColors
}

export default function CatalogueObjectCard(props: CatalogueObject){

    const size = getMagnitudeSize(props.PhotovisualMagnitude)
    const color = getSpectralTypeColors(props.SpectralType)

    const {convertToArrayRepresentation} = useAngleRepresentationUtility()

    const convertDecimalAngleToArrayAngleText = (decimalAngle: number, units: string[]) => {
        let arrayAngle = convertToArrayRepresentation(decimalAngle)

        let arrayAngleAsText = convertArrayToTextRepresentation(arrayAngle, units)

        return arrayAngleAsText
    }

    const convertArrayToTextRepresentation = (array: string[] | number[], units?: string[]) => {
        let names = array[0]

        if(units){
            names += units[0]
            for(let i = 1; i < array.length; i++){
                names = names + ', ' + array[i] + units[i]
            }
            return names
        }
        
        for(let i = 1; i < array.length; i++){
            names = names + ', ' + array[i]
        }
        return names
    }

    const StarIcon = () => (<View testID='CatalogueObjectCardIcon'><Icon source='creation' size={size} color={color}></Icon></View>)

    return(
        <View testID='CatalogueObjectCard' style={[styles.container, {backgroundColor: props.ThemeColors.Background}]}>
            <View style={styles.iconContainer}>
                <StarIcon/>
            </View>
            <View style={styles.infoContainer}>
                <Text style={[styles.text, {color: props.ThemeColors.TextColor}]}>Names: {convertArrayToTextRepresentation(props.Names)}</Text>
                <Text style={[styles.text, {color: props.ThemeColors.TextColor}]}>HD ID: {props.HD_ID}</Text>
                <Text style={[styles.text, {color: props.ThemeColors.TextColor}]}>Right ascension: {convertDecimalAngleToArrayAngleText(props.RA, ['h', 'm', 's'])}</Text>
                <Text style={[styles.text, {color: props.ThemeColors.TextColor}]}>Declination: {convertDecimalAngleToArrayAngleText(props.DE, ['º', '\'', '"'])}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 20,
        borderTopColor: '#1f1f1f',
        borderLeftColor: '#1f1f1f',
        borderBottomColor: '#242424',
        borderRightColor: '#242424',
        borderStyle: 'solid',
        borderWidth: 8,
    },
    iconContainer: {
        justifyContent: 'center', 
        alignSelf: 'center', 
        padding: 10,
    },
    infoContainer: {
        alignSelf: 'center',
        padding: 10
    },
    text: {
        fontSize: 15,
        flex: 0.25
    }
})