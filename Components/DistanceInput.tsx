import { TextInput, Text, View, StyleSheet } from 'react-native'

import { ManualInputScreenColors } from '../assets/ColorPalettes'
import React from 'react'

interface InputFieldProps{
    themeColors: ManualInputScreenColors,
    style: any,
    textInfo: string[],
    orderNum: number,
    saveCallback: (index: number, value: string) => void
}

const InputField = (props: InputFieldProps) => {
    const themeColors = props.themeColors

    let componentsReference: Array<TextInput> = []

    const ReferenceComponent = (component: TextInput | null, orderNum: number) => {
        if(component)
        {
            componentsReference[orderNum] = component;
            console.log("Saving reference nº: " + orderNum)
            console.log("References count: " + componentsReference.length)
        }
    }

    const FocusComponent = (componentOrderNum: number) => {
        if((componentOrderNum + 1) < componentsReference.length){
            try{
                componentsReference[componentOrderNum + 1].focus()
            }
            catch(e){
                console.log(componentOrderNum + 1)
                console.log(componentsReference[componentOrderNum + 1])
            }
        }
    }

    return (
        <View style={[props.style, styles.container, {backgroundColor: themeColors.PropertyInput}]}>
            <TextInput 
            textAlign='center'
            inputMode='numeric'
            maxLength={3}
            placeholder='000'
            onChangeText = {(value) => {props.saveCallback(props.orderNum, value)}}
            ref={(input) => {ReferenceComponent(input, props.orderNum)}}
            onSubmitEditing = {() => {FocusComponent(props.orderNum)}}
            blurOnSubmit={false}
            placeholderTextColor={themeColors.PlaceholderTextColor}
            style={[styles.textInputStyle, {color: themeColors.TextColor}]}
            />
    
            <Text style={[styles.text, {color: themeColors.TextColor}]}>{props.textInfo[1]}</Text>
    
            <TextInput 
            textAlign='center'
            inputMode='numeric'
            maxLength={2}
            placeholder='00'
            onChangeText = {(value) => {props.saveCallback(2, value)}}
            ref={(input) => {ReferenceComponent(input, props.orderNum + 1)}}
            onSubmitEditing = {() => {FocusComponent(props.orderNum + 1)}}
            blurOnSubmit={false}
            placeholderTextColor={themeColors.PlaceholderTextColor}
            style={[styles.textInputStyle, {color: themeColors.TextColor}]}
            />
        
            <Text style={[styles.text, {color: themeColors.TextColor}]}>{props.textInfo[2]}</Text>
        
            <TextInput 
            textAlign='center'
            inputMode='numeric'
            maxLength={2}
            placeholder='00'
            onChangeText = {(value) => {props.saveCallback(3, value)}}
            ref={(input) => {ReferenceComponent(input, props.orderNum + 2)}}
            onSubmitEditing = {() => {FocusComponent(props.orderNum + 2)}}
            placeholderTextColor={themeColors.PlaceholderTextColor}
            style={[styles.textInputStyle, {color: themeColors.TextColor}]}
            />
        
            <Text style={[styles.text, {color: themeColors.TextColor}]}>{props.textInfo[3]}</Text>
        </View>
      )
}

interface DistanceInputProps{
    themeColors: ManualInputScreenColors,
    style: any,
    textInfo: string[],
    isHourAngle: boolean,
    isOrigin: boolean,
    saveCallback: (index: number, value: string) => void
}

export function DistanceInput(props: DistanceInputProps) {
    
    if(props.isHourAngle)
    {
        if(props.isOrigin)
        {
        return (
            <InputField
            themeColors={props.themeColors}
            style={props.style}
            textInfo={props.textInfo}
            saveCallback={props.saveCallback}
            orderNum={0}
            />
        )
        }

        return (
            <InputField
            themeColors={props.themeColors}
            style={props.style}
            textInfo={props.textInfo}
            saveCallback={props.saveCallback}
            orderNum={3}
            />
        )
    }

    if(props.isOrigin)
    {
        return (
            <InputField
            themeColors={props.themeColors}
            style={props.style}
            textInfo={props.textInfo}
            saveCallback={props.saveCallback}
            orderNum={6}
            />
        )
    }

    return (
        <InputField
        themeColors={props.themeColors}
        style={props.style}
        textInfo={props.textInfo}
        saveCallback={props.saveCallback}
        orderNum={9}
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