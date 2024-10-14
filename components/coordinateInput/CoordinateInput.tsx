import React from 'react'
import { TextInput, Text, View, StyleSheet } from 'react-native'

import { ManualInputScreenColors } from '../../assets/ColorPalettes'
import CoordinateInputField from '../coordinateInputField/CoordinateInputField'

export interface CoordinateInputProps{
  themeColors: ManualInputScreenColors,
  fieldUnits: string[],
  unitsMaxValue: number[],
  isOrigin: boolean,
  SaveCoordinates: (index: number, value: string[]) => void
}

function CoordinateInput(props: CoordinateInputProps) {
  if(props.isOrigin)
  {
    return (
      <View>
        <CoordinateInputField
        {...props}
        saveIndex={0}
        />
      </View>
    )
  }

  return (
    <View>
      <CoordinateInputField
      {...props}
      saveIndex={1}
      />
    </View>
  )  
}

export default CoordinateInput

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
  }
})