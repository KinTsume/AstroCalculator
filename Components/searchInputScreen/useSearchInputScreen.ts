import { useRef, useState, useEffect } from "react";

import useCalculateDistance from "../../utils/useCalculateDistance"
import useAngleRepresentationUtility from "../../utils/useAngleRepresentationUtility";
import { CatalogueObject } from "../catalogueObjectCard/CatalogueObjectCard";
import { DARK } from "../../assets/ColorPalettes";

export interface navigationProps {
    navigation: any,
    route: {
        params: {
            catalogueObject: CatalogueObject,
            position: string
        }
    },
    originObject: CatalogueObject,
    targetObject: CatalogueObject,
    SetObject: (catalogueObject: CatalogueObject, positionToSet: string) => void
}

const useSearchInputScreen = ({navigation, route, ...props}: navigationProps) => {
    const { calculateDistance } = useCalculateDistance()
    const { convertToArrayRepresentation, convertToDecimalRepresentation } = useAngleRepresentationUtility()

    useEffect(() => {
        if(route && route.params && route.params.position)
        {
            const routeParams = route.params
            props.SetObject(routeParams.catalogueObject, routeParams.position)
        }
    })

    let distanceRA = calculateDistance(props.originObject.RA, props.targetObject.RA)
    let distanceDE = calculateDistance(props.originObject.DE, props.targetObject.DE)

    let resultRA = convertToArrayRepresentation(distanceRA)
    let resultDE = convertToArrayRepresentation(distanceDE)

    return {...props, resultRA, resultDE, navigation}
}

export default useSearchInputScreen