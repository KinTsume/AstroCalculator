import { useRef, useState, useEffect } from "react";

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
}

const useSearchInputScreenNavigator = () => {

    const [originObject, setOriginObject] = useState<CatalogueObject>(emptyCatalogueObject)
    const [targetObject, setTargetObject] = useState<CatalogueObject>(emptyCatalogueObject)

    const SetObject = (catalogueObject: CatalogueObject, positionToSet: string) => {
        switch(positionToSet){
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

    return {originObject, targetObject, SetObject}
}

export default useSearchInputScreenNavigator