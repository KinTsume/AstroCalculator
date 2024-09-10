import { useRef, useState } from "react";

import useCalculateDistance from "../../utils/useCalculateDistance"
import useAngleRepresentationUtility from "../../utils/useAngleRepresentationUtility";
import { CatalogueObject } from "../catalogueObjectCard/CatalogueObjectCard";
import { DARK } from "../../assets/ColorPalettes";

const emptyCatalogueObject: CatalogueObject = {
    Names: [''],
    HD_ID: 0,
    RA: 0,
    DE: 0,
    PhotovisualMagnitude: 0,
    SpectralType: 'O0',
    ThemeColors: DARK.SearchInputScreen
}

const useSearchInputScreenNavigator = () => {
    const selectedCard = useRef('origin')

    const [originObject, setOriginObject] = useState(emptyCatalogueObject)
    const [targetObject, setTargetObject] = useState(emptyCatalogueObject)

    const { calculateDistance } = useCalculateDistance()
    const { convertToArrayRepresentation, convertToDecimalRepresentation } = useAngleRepresentationUtility()

    const ChangeSelectedCard = (cardPosition: string) => {
        selectedCard.current = cardPosition
    }

    const ChangeObject = (catalogueObject: CatalogueObject) => {
        switch(selectedCard.current){
            case 'origin':
                setOriginObject(catalogueObject)
                break;
            case 'target':
                setTargetObject(catalogueObject)
                break;
            default:
                console.warn('object position don\'t exist')
                break;
        }
    }

    let distanceRA = calculateDistance(originObject.RA, targetObject.RA)
    let distanceDE = calculateDistance(originObject.DE, targetObject.DE)
    
    const resultRA = convertToArrayRepresentation(distanceRA)
    const resultDE = convertToArrayRepresentation(distanceDE)

    return {originObject, targetObject, selectedCard, resultRA, resultDE, ChangeSelectedCard, ChangeObject}
}

export default useSearchInputScreenNavigator