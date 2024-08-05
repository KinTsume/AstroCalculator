import { View, Text } from "react-native"
import Ionicons from "react-native-ionicons";
import { SearchInputScreenColors } from "../../assets/ColorPalettes";

import getSpectralTypeColors from "./getSpectralTypeColor";
import getMagnitudeSize from "./getPhotovisualMagnitudeSize";

export interface CatalogueObjectCardProps {
    Names: string[],
    HD_ID: number,
    RA: number[],
    DE: number[],
    PhotovisualMagnitude: number,
    SpectralType: string,
    ThemeColors: SearchInputScreenColors
}

export default function CatalogueObjectCard(props: CatalogueObjectCardProps){

    const size = getMagnitudeSize(props.PhotovisualMagnitude)
    const color = getSpectralTypeColors(props.SpectralType)

    const getStringFromArray = (namesArray: string[] | number[], units?: string[]) => {
        let names = namesArray[0]

        if(units){
            names += units[0]
            for(let i = 1; i < namesArray.length; i++){
                names = names + ', ' + namesArray[i] + units[i]
            }
            return names
        }
        
        for(let i = 1; i < namesArray.length; i++){
            names = names + ', ' + namesArray[i]
        }
        return names
    }

    const StarIcon = () => {
        return <Ionicons testID='CatalogueObjectCardIcon' name='star' size={size} color={color} />
    }

    return(
        <View testID='CatalogueObjectCard'>
            <View>
                <StarIcon/>
            </View>
            <View>
                <Text>Names: {getStringFromArray(props.Names)}</Text>
                <Text>HD ID: {props.HD_ID}</Text>
                <Text>Right ascension: {getStringFromArray(props.RA, ['h', 'm', 's'])}</Text>
                <Text>Declination: {getStringFromArray(props.DE, ['º', '\'', '"'])}</Text>
            </View>
        </View>
    )
}