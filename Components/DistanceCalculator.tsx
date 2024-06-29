import React, { useState } from 'react'
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native'

import { DistanceInput } from './DistanceInput'
import { ManualInputScreenColors } from '../assets/ColorPalettes'

interface DistanceCalculatorProps {
  isHourAngle: boolean,
  textInfo: string[],
  themeColors: ManualInputScreenColors,
  style: any
}
export function DistanceCalculator(props: DistanceCalculatorProps) {

  const originInput = [0, 0, 0];
  const targetInput = [0, 0, 0];
  const [result, setResult] = useState([0, 0, 0]);

  const themeColors = props.themeColors

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

  const CalculateDistanceInDegrees = (origin: number[], target: number[]) => {
    let originDeclination = ConvertToSeconds(origin)
    let targetDeclination = ConvertToSeconds(target)

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

  return (
    <View style={[styles.container, {backgroundColor: themeColors.Background}]}>
      <View style={[styles.inputContainer, {backgroundColor: themeColors.Background}]}>
        <View style={[styles.propertyContainer, {backgroundColor: themeColors.PropertyContainer}]}>

          <Text style={[styles.propertyText, {color: themeColors.TextColor}]}>
            Origin {props.textInfo[0]}
          </Text>

          <DistanceInput 
          themeColors={props.themeColors}
          textInfo={props.textInfo}
          isHourAngle={props.isHourAngle}
          isOrigin={true} 
          saveCallback={SaveValues} 
          style={[styles.textInput, {backgroundColor: 'lightblue'}]}
          />
        </View>

        <View style={[styles.propertyContainer, {backgroundColor: themeColors.PropertyContainer}]}>
          <Text style={[styles.propertyText, {color: themeColors.TextColor}]}>
            Target {props.textInfo[0]}
          </Text>

          <DistanceInput 
          themeColors={props.themeColors}
          textInfo={props.textInfo}
          isHourAngle={props.isHourAngle}
          isOrigin={false} 
          saveCallback={SaveValues} 
          style={styles.textInput}
          />

        </View>
      </View>
      <View style={[styles.resultButton, {backgroundColor: themeColors.ResultButton}]}>
        <Pressable onPress={() => {CalculateDistanceInDegrees(originInput, targetInput)}} 
        style={[styles.resultButton, {backgroundColor: themeColors.ResultButton}]}>
          <Text style={[styles.resultButtonText, {color: themeColors.TextColor}]}>Calculate</Text>
        </Pressable>
      </View>
      <Text style={[styles.resultText, {color: themeColors.TextColor}]}>
        Result: {result[0]}{props.textInfo[1]}{result[1]}{props.textInfo[2]}{result[2]}{props.textInfo[3]}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:5,
    alignItems: 'center'
  },
  resultButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10
  },
  resultButtonText: {
    fontSize: 25
  },
  resultText: {
    flex: 5,
    fontSize: 25
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  propertyContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: '#bff2ff'
  },

  textInput: {
    height: 40,
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'lightblue'
  },

  propertyText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    fontSize: 20
  }

})