import { TextInput, Text, View, StyleSheet } from 'react-native'
import { useRef } from 'react'

import { ManualInputScreenColors } from '../../assets/ColorPalettes'

interface InputFieldProps{
  themeColors: ManualInputScreenColors,
  style: any,
  textInfo: string[],
  orderNum: number,
  SaveValues: (index: number, value: string[]) => void,
}

const CoordinateInputField = (props: InputFieldProps) => {
    const secondTextInput = useRef<TextInput>(null)
    const thirdTextInput = useRef<TextInput>(null)

    const inputTexts = useRef(["0", "0", "0"])

    const themeColors = props.themeColors

    return (
        <View style={[props.style, styles.container, {backgroundColor: themeColors.PropertyInput}]}>
            <TextInput 
            textAlign='center'
            inputMode='numeric'
            maxLength={3}
            placeholder='000'
            onChangeText = {(value) => {inputTexts.current[0] = value}}
            onSubmitEditing = {() => {
              secondTextInput.current?.focus()
              props.SaveValues(props.orderNum, inputTexts.current)
            }}
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
            onChangeText = {(value) => {inputTexts.current[1] = value}}
            ref={secondTextInput}
            onSubmitEditing = {() => {
              thirdTextInput.current?.focus()
              props.SaveValues(props.orderNum, inputTexts.current)
            }}
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
            onChangeText = {(value) => {inputTexts.current[2] = value}}
            ref={thirdTextInput}
            onSubmitEditing = {() => {
              props.SaveValues(props.orderNum, inputTexts.current)
            }}
            placeholderTextColor={themeColors.PlaceholderTextColor}
            style={[styles.textInputStyle, {color: themeColors.TextColor}]}
            />
        
            <Text style={[styles.text, {color: themeColors.TextColor}]}>{props.textInfo[3]}</Text>
        </View>
      )
}

export default CoordinateInputField

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
