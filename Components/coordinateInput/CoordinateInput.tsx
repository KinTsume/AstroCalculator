import React from 'react'
import { TextInput, Text, View, StyleSheet } from 'react-native'

import { ManualInputScreenColors } from '../../assets/ColorPalettes'
import CoordinateInputField from '../coordinateInputField/CoordinateInputField'
import { ManualInputFieldViewProps } from '../manualInputField/ManualInputFieldView'

export interface CoordinateInputProps extends Omit<ManualInputFieldViewProps, 'fieldName'|'CalculateDistanceInDegrees'>{
  isOrigin: boolean
}

function CoordinateInput(props: CoordinateInputProps) {
    
    if(props.isHourAngle)
    {
        if(props.isOrigin)
        {
        return (
          <CoordinateInputField
          {...props}
          orderNum={0}
          />
        )
        }

        return (
          <CoordinateInputField
          {...props}
          orderNum={1}
          />
        )
    }

    if(props.isOrigin)
    {
        return (
          <CoordinateInputField
          {...props}
          orderNum={2}
          />
        )
    }

    return (
      <CoordinateInputField
      {...props}
      orderNum={3}
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