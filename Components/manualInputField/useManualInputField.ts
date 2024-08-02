import { useRef } from "react";

import useCalculateDistance from "../../utils/useCalculateDistance";

import { ManualInputScreenColors } from '../../assets/ColorPalettes'

export interface ManualInputFieldProps{
  themeColors: ManualInputScreenColors,
  fieldName: string,
  fieldUnits: string[],
  unitsMaxValue: number[],
  style: any
}

const useManualInputField = (props: ManualInputFieldProps) => {

  const originInput = useRef([0, 0, 0])
  const targetInput = useRef([0, 0, 0])

  const { CalculateDistance } = useCalculateDistance()

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
    return CalculateDistance(originInput.current, targetInput.current);
  }

  return {...props, SaveValues, CalculateDistanceInDegrees}
}

export default useManualInputField