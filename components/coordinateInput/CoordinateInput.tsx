import React from 'react'
import { TextInput, Text, View, StyleSheet } from 'react-native'

import { ManualInputScreenColors } from '../../assets/ColorPalettes'
import CoordinateInputField from '../coordinateInputField/CoordinateInputField'

export interface CoordinateInputProps{
  themeColors: ManualInputScreenColors,
  fieldUnits: string[],
  unitsMaxValue: number[],
  isOrigin: boolean,
  SaveOrigin: (value: string[]) => void,
  SaveTarget: (value: string[]) => void,
}

function CoordinateInput(props: CoordinateInputProps) {
  if(props.isOrigin)
  {
    return (
      <View>
        <CoordinateInputField
        {...props}
        SaveCallback={props.SaveOrigin}
        />
      </View>
    )
  }

  return (
    <View>
      <CoordinateInputField
      {...props}
      SaveCallback={props.SaveTarget}
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