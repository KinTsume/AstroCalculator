import React from 'react'
import { TextInput, Text, View, StyleSheet } from 'react-native'

import { ManualInputScreenColors } from '../../assets/ColorPalettes'
import CoordinateInputField from '../coordinateInputField/CoordinateInputField'

export interface CoordinateInputProps{
  themeColors: ManualInputScreenColors,
  fieldUnits: string[],
  unitsMaxValue: number[],
  isOrigin: boolean,
  style: any,
  SaveValues: (index: number, value: string[]) => void
}

function CoordinateInput(props: CoordinateInputProps) {
  if(props.isOrigin)
  {
    return (
      <CoordinateInputField
      {...props}
      saveIndex={0}
      />
    )
  }

  return (
    <CoordinateInputField
    {...props}
    saveIndex={1}
    />
  )  
}

export default CoordinateInput

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row'
  },

  textInputStyle: {
    fontSize: 20
  },

  text: {
    fontSize: 20,
    marginTop: 6
  }
})