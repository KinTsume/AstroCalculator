import { TextInput, Text, View, StyleSheet } from 'react-native'
import { useRef, useState } from 'react'

import { ManualInputScreenColors } from '../../assets/ColorPalettes'

export interface InputFieldProps{
  fieldUnits: string[],
  unitsMaxValue: number[],
  orderNum: number,
  themeColors: ManualInputScreenColors,
  style: any,
  SaveValues: (index: number, value: string[]) => void
}

const CoordinateInputField = (props: InputFieldProps) => {
    const secondTextInput = useRef<TextInput>(null)
    const thirdTextInput = useRef<TextInput>(null)

    const [inputTexts, setInputTexts] = useState(['0', '0', '0']);

    const themeColors = props.themeColors

    return (
        <View style={[props.style, styles.container, {backgroundColor: themeColors.PropertyInput}]}>
            <TextInput 
            testID='inputSubfield'
            textAlign='center'
            inputMode='numeric'
            maxLength={3}
            placeholder='000'
            value={inputTexts[0]}
            onChangeText = {(value) => {
              let parsed = parseInt(value)
              if(parsed >= props.unitsMaxValue[0]){
                parsed = props.unitsMaxValue[0] - 1
                value = '' + parsed
              }
              
              setInputTexts([value, inputTexts[1], inputTexts[2]])}
            }
            onSubmitEditing = {() => {
              secondTextInput.current?.focus()
              props.SaveValues(props.orderNum, inputTexts)
              console.log('Submitted editing')
            }}
            onEndEditing={() => {
              props.SaveValues(props.orderNum, inputTexts)
              console.log('End editing')
            }}
            blurOnSubmit={false}
            placeholderTextColor={themeColors.PlaceholderTextColor}
            style={[styles.textInputStyle, {color: themeColors.TextColor}]}
            />
    
            <Text style={[styles.text, {color: themeColors.TextColor}]} testID='inputSubfieldText'>{props.fieldUnits[0]}</Text>
    
            <TextInput 
            testID='inputSubfield'
            textAlign='center'
            inputMode='numeric'
            maxLength={2}
            placeholder='00'
            value={inputTexts[1]}
            onChangeText = {(value) => {
              let parsed = parseInt(value)
              if(parsed >= props.unitsMaxValue[1]){
                parsed = props.unitsMaxValue[1] - 1
                value = '' + parsed
              }
              setInputTexts([inputTexts[0], value, inputTexts[2]])
            }}
            ref={secondTextInput}
            onSubmitEditing = {() => {
              thirdTextInput.current?.focus()
              props.SaveValues(props.orderNum, inputTexts)
            }}
            blurOnSubmit={false}
            placeholderTextColor={themeColors.PlaceholderTextColor}
            style={[styles.textInputStyle, {color: themeColors.TextColor}]}
            />
        
            <Text style={[styles.text, {color: themeColors.TextColor}]} testID='inputSubfieldText'>{props.fieldUnits[1]}</Text>
        
            <TextInput 
            testID='inputSubfield'
            textAlign='center'
            inputMode='numeric'
            maxLength={2}
            placeholder='00'
            value={inputTexts[2]}
            onChangeText = {(value) => {
              let parsed = parseInt(value)
              if(parsed >= props.unitsMaxValue[2]){
                parsed = props.unitsMaxValue[2] - 1
                value = '' + parsed
              }
              setInputTexts([inputTexts[0], inputTexts[1], value])
            }}
            ref={thirdTextInput}
            onSubmitEditing = {() => {
              props.SaveValues(props.orderNum, inputTexts)
            }}
            placeholderTextColor={themeColors.PlaceholderTextColor}
            style={[styles.textInputStyle, {color: themeColors.TextColor}]}
            />
        
            <Text style={[styles.text, {color: themeColors.TextColor}]} testID='inputSubfieldText'>{props.fieldUnits[2]}</Text>
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
