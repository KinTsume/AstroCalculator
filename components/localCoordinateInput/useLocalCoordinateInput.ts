import { useState } from "react"
import useAngleRepresentationUtility from "../../utils/useAngleRepresentationUtility"

export interface localCoordinateInputProps{

}

const useLocalCoordinateInput = () => {

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    const {convertToDecimalRepresentation} = useAngleRepresentationUtility()

    const SaveLatitude = (latitude: string[]) => {
        const asNumberArray = [parseInt(latitude[0]), parseInt(latitude[1]), parseInt(latitude[2])]
        
        const asDecimalRepresentation = convertToDecimalRepresentation(asNumberArray)

        setLatitude(asDecimalRepresentation)
    }

    const SaveLongitude = (longitude: string[]) => {
        const asNumberArray = [parseInt(longitude[0]), parseInt(longitude[1]), parseInt(longitude[2])]
        
        const asDecimalRepresentation = convertToDecimalRepresentation(asNumberArray)

        setLongitude(asDecimalRepresentation)
    }

    return{SaveLatitude, SaveLongitude, latitude, longitude}
}

export default useLocalCoordinateInput