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
        //return <Ionicons testID='CatalogueObjectCardIcon' name='star' size={size} color={color} />

    return(
        <View testID='CatalogueObjectCard' style={{flex: 1, flexDirection: 'row'}}>
            <View style={{justifyContent: 'center', alignSelf: 'center', padding: 10}}>
                <StarIcon/>
            </View>
            <View style={{alignSelf: 'center', padding: 10}}>
                <Text style={styles.text}>Names: {convertArrayToTextRepresentation(props.Names)}</Text>
                <Text style={styles.text}>HD ID: {props.HD_ID}</Text>
                <Text style={styles.text}>Right ascension: {convertDecimalAngleToArrayAngleText(props.RA, ['h', 'm', 's'])}</Text>
                <Text style={styles.text}>Declination: {convertDecimalAngleToArrayAngleText(props.DE, ['º', '\'', '"'])}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    }
})