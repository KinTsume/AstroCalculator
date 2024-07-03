import React, { useState } from 'react'
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native'

import { DistanceInput } from '../DistanceInput'
import { ManualInputScreenColors } from '../../assets/ColorPalettes'

import { DistanceCalculatorProps } from './useDistanceCalculator'

interface DistanceCalculatorViewProps extends DistanceCalculatorProps {
  SaveValues: (index: number, value: string) => void
  CalculateDistanceInDegrees: () => void,
  result: Array<number>
}

const DistanceCalculatorView = (props: DistanceCalculatorViewProps) => {
  const themeColors = props.themeColors

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
          saveCallback={props.SaveValues} 
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
          saveCallback={props.SaveValues} 
          style={styles.textInput}
          />

        </View>
      </View>
      <View style={[styles.resultButton, {backgroundColor: themeColors.ResultButton}]}>
        <Pressable onPress={() => {props.CalculateDistanceInDegrees()}} 
        style={[styles.resultButton, {backgroundColor: themeColors.ResultButton}]}>
          <Text style={[styles.resultButtonText, {color: themeColors.TextColor}]}>Calculate</Text>
        </Pressable>
      </View>
      <Text style={[styles.resultText, {color: themeColors.TextColor}]}>
        Result: {props.result[0]}{props.textInfo[1]}{props.result[1]}{props.textInfo[2]}{props.result[2]}{props.textInfo[3]}
      </Text>
    </View>
  )
}

export default DistanceCalculatorView

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