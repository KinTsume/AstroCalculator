import { useRef } from "react";

import useCalculateDistance from "../../utils/useCalculateDistance";
import useAngleRepresentationUtility from "../../utils/useAngleRepresentationUtility";

import { ManualInputScreenColors } from '../../assets/ColorPalettes'

export interface ManualInputFieldProps{
  themeColors: ManualInputScreenColors,
  fieldName: string,
  fieldUnits: string[],
  unitsMaxValue: number[],
  style: any
}

const useManualInputField = (props: ManualInputFieldProps) => {

  const originInput = useRef(0)
  const targetInput = useRef(0)

  const { calculateDistance } = useCalculateDistance()
  const { convertToArrayRepresentation, convertToDecimalRepresentation } = useAngleRepresentationUtility()

  const SaveValues = (index: number, value: string[]) => {

    let parsedAngle = value.map((x) => parseInt(x))
    let decimalAngle = convertToDecimalRepresentation(parsedAngle)

    switch(index){
      case 0:
        originInput.current = decimalAngle
        break;

      case 1:
        targetInput.current = decimalAngle
        break;

      default:
        break;
    }
  }

  const CalculateDistanceInDegrees = () => {
    let distance = targetInput.current - originInput.current

    let distanceArray = convertToArrayRepresentation(distance)
    
    return distanceArray;
  }

  return {...props, SaveValues, CalculateDistanceInDegrees}
}

export default useManualInputField