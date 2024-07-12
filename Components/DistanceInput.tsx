import { TextInput, Text, View, StyleSheet } from 'react-native'

import { ManualInputScreenColors } from '../assets/ColorPalettes'
import CoordinateInputField from './coordinateInputField/CoordinateInputField'
import React from 'react'

export interface DistanceInputProps{
    themeColors: ManualInputScreenColors,
    style: any,
    textInfo: string[],
    isHourAngle: boolean,
    isOrigin: boolean,
    SaveValues: (index: number, value: string[]) => void
}

export function DistanceInput(props: DistanceInputProps) {
    
    if(props.isHourAngle)
    {
        if(props.isOrigin)
        {
        return (
            <CoordinateInputField
            themeColors={props.themeColors}
            style={props.style}
            textInfo={props.textInfo}
            SaveValues={props.SaveValues}
            orderNum={0}
            />
        )
        }

        return (
            <CoordinateInputField
            themeColors={props.themeColors}
            style={props.style}
            textInfo={props.textInfo}
            SaveValues={props.SaveValues}
            orderNum={1}
            />
        )
    }

    if(props.isOrigin)
    {
        return (
            <CoordinateInputField
            themeColors={props.themeColors}
            style={props.style}
            textInfo={props.textInfo}
            SaveValues={props.SaveValues}
            orderNum={2}
            />
        )
    }

    return (
        <CoordinateInputField
        themeColors={props.themeColors}
        style={props.style}
        textInfo={props.textInfo}
        SaveValues={props.SaveValues}
        orderNum={3}
        />
    )
  
}

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