import { useRef } from "react";

import { ManualInputScreenColors } from '../../assets/ColorPalettes'

export interface ManualInputFieldProps{
  themeColors: ManualInputScreenColors,
  fieldName: string,
  fieldUnits: string[],
  unitsMaxValue: number[],
  style: any
}

const useManualInputField = (props: ManualInputFieldProps) => {

  const originInput = useRef([0, 0, 0]);
  const targetInput = useRef([0, 0, 0])

  const SaveValues = (index: number, value: string[]) => {
    switch(index){
      case 0:
        originInput.current = value.map((x) => parseInt(x))
        console.log('Set origin Input: ' + originInput.current)
        break;

      case 1:
        targetInput.current = value.map((x) => parseInt(x))
        console.log('Set target Input: ' + targetInput.current)
        break;

      default:
        break;
    }
  }

  const CalculateDistanceInDegrees = () => {
    let originDeclination = ConvertToSeconds(originInput.current)
    let targetDeclination = ConvertToSeconds(targetInput.current)

    let distanceInSeconds = targetDeclination - originDeclination

    let distanceInDegrees = ConvertToDegrees(distanceInSeconds)

    console.log('Calculating: ' + distanceInDegrees)

    return distanceInDegrees
  }

  const ConvertToSeconds = (declinationInDegrees: number[]) => {
    let convertedDeclination = declinationInDegrees[0] * (60*60) + declinationInDegrees[1] * 60 + declinationInDegrees[2] 

    return convertedDeclination
  }
  
  const ConvertToDegrees = (declinationInSeconds: number) => {
    let degrees = Math.trunc(declinationInSeconds / (60*60))

    let rest = declinationInSeconds % (60*60)

    let minutes = Math.trunc(rest / 60)

    rest = rest % 60

    let seconds = rest

    let declinationInDegrees = [degrees, minutes, seconds]

    return declinationInDegrees
  }

  return {...props, SaveValues, CalculateDistanceInDegrees}
}

export default useManualInputField