import { useState } from "react"
import useAngleRepresentationUtility from "../../utils/useAngleRepresentationUtility"
import Geolocation from "@react-native-community/geolocation"

export interface localCoordinateInputProps{

}

const useLocalCoordinateInput = () => {

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    const {convertToDecimalRepresentation} = useAngleRepresentationUtility()

    const SaveLatitude = (index: number, latitude: string[] | number) => {

        if(typeof latitude == 'number'){
            setLatitude(latitude)
            return
        }

        const asNumberArray = [parseInt(latitude[0]), parseInt(latitude[1]), parseInt(latitude[2])]
        
        const asDecimalRepresentation = convertToDecimalRepresentation(asNumberArray)

        setLatitude(asDecimalRepresentation)
    }

    const SaveLongitude = (index: number, longitude: string[] | number) => {
        
        if(typeof longitude == 'number'){
            setLongitude(longitude)
            return
        }

        const asNumberArray = [parseInt(longitude[0]), parseInt(longitude[1]), parseInt(longitude[2])]
        
        const asDecimalRepresentation = convertToDecimalRepresentation(asNumberArray)

        setLongitude(asDecimalRepresentation)
    }

    const GetGeolocation = () => {
        Geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
    }

    return{SaveLatitude, SaveLongitude, GetGeolocation, latitude, longitude}
}

export default useLocalCoordinateInput