import React, { useState } from 'react'
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native'

import CoordinateInput from '../coordinateInput/CoordinateInput'
import { ManualInputFieldProps } from './useManualInputField'

export interface ManualInputFieldViewProps extends ManualInputFieldProps {
  SaveValues: (index: number, value: string[]) => void
  CalculateDistanceInDegrees: () => number[]
}

const ManualInputFieldView = (props: ManualInputFieldViewProps) => {
  const themeColors = props.themeColors

  const [result, setResult] = useState([0, 0, 0]);

  return (
    <View testID='ManualInputField' style={[styles.container, {backgroundColor: themeColors.Background}]}>
      <View style={[styles.inputContainer, {backgroundColor: themeColors.Background}]}>
        <View style={[styles.propertyContainer, {backgroundColor: themeColors.PropertyContainer}]}>

          <Text style={[styles.propertyText, {color: themeColors.TextColor}]}>
            {'Origin ' + props.fieldName}
          </Text>

          <CoordinateInput
          {...props} 
          isOrigin={true} 
          SaveCoordinates={props.SaveValues}
          />
        </View>

        <View style={[styles.propertyContainer, {backgroundColor: themeColors.PropertyContainer}]}>
          <Text style={[styles.propertyText, {color: themeColors.TextColor}]}>
            {'Target ' + props.fieldName}
          </Text>

          <CoordinateInput
          {...props} 
          isOrigin={false}
          SaveCoordinates={props.SaveValues}
          />

        </View>
      </View>
      <View style={[styles.resultButton, {backgroundColor: themeColors.ResultButton}]}>
        <Pressable testID='submitButton' onPress={() => {
          setResult(props.CalculateDistanceInDegrees())
        }} 
        style={[styles.resultButton, {backgroundColor: themeColors.ResultButton}]}>
          <Text style={[styles.resultButtonText, {color: themeColors.TextColor}]}>Calculate</Text>
        </Pressable>
      </View>
      <Text style={[styles.resultText, {color: themeColors.TextColor}]}>
        {'Result: ' + result[0] + props.fieldUnits[0] + result[1] + props.fieldUnits[1] + result[2] + props.fieldUnits[2]}
      </Text>
    </View>
  )
}

export default ManualInputFieldView

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
    fontSize: 20,
    paddingBottom: 5
  }

})