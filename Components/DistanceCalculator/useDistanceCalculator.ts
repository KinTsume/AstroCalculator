import { useState } from "react";

import { ManualInputScreenColors } from '../../assets/ColorPalettes'

export interface DistanceCalculatorProps {
    isHourAngle: boolean,
    textInfo: string[],
    themeColors: ManualInputScreenColors,
    style: any
  }

const useDistanceCalculator = (props: DistanceCalculatorProps) => {

    const originInput = [0, 0, 0];
    const targetInput = [0, 0, 0];
    const [result, setResult] = useState([0, 0, 0]);

    const SaveValues = (index: number, value: string) => {

        switch(index)
        {
          case 1: 
            originInput[0] = parseInt(value)
          break;
    
          case 2: 
            originInput[1] = parseInt(value)
          break;
    
          case 3: 
            originInput[2] = parseInt(value)
          break;
    
          case 4: 
            targetInput[0] = parseInt(value)
          break;
    
          case 5: 
            targetInput[1] = parseInt(value)
          break;
    
          case 6: 
            targetInput[2] = parseInt(value)
          break;
          
        }
    }

    const CalculateDistanceInDegrees = () => {
        let originDeclination = ConvertToSeconds(originInput)
        let targetDeclination = ConvertToSeconds(targetInput)
    
        let distanceInSeconds = targetDeclination - originDeclination
    
        let distanceInDegrees = ConvertToDegrees(distanceInSeconds)
    
        console.log('Calculating: ' + distanceInDegrees)
    
        setResult(distanceInDegrees)
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

    return {...props, SaveValues, CalculateDistanceInDegrees, result}
}

export default useDistanceCalculator