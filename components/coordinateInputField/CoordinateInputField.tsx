import { TextInput, Text, View, StyleSheet } from 'react-native'
import { useRef, useState } from 'react'

import { ManualInputScreenColors } from '../../assets/ColorPalettes'

export interface InputFieldProps{
  fieldUnits: string[],
  unitsMaxValue: number[],
  themeColors: ManualInputScreenColors,
  SaveCallback: (value: string[]) => void
}

const CoordinateInputField = (props: InputFieldProps) => {
    const secondTextInput = useRef<TextInput>(null)
    const thirdTextInput = useRef<TextInput>(null)

    const [inputTexts, setInputTexts] = useState(['0', '0', '0']);

    const themeColors = props.themeColors

    const checkLimit = (value: string, index: number) => {

      let parsedValue = parseInt(value)
      let absValue = Math.abs(parsedValue)
      let sign = parsedValue / absValue

      if(absValue >= props.unitsMaxValue[index]){
        parsedValue = (props.unitsMaxValue[index] - 1) * sign
        value = '' + parsedValue
      }
      
      switch(index) {
        case 0:
          setInputTexts([value, inputTexts[1], inputTexts[2]])
          break

        case 1:
          setInputTexts([inputTexts[0], value, inputTexts[2]])
          break

        case 2:
          setInputTexts([inputTexts[0], inputTexts[1], value])
          break
      }
    }

    return (
        <View testID='coordinateInputField' style={[styles.container, {backgroundColor: themeColors.PropertyInput}]}>
            <TextInput 
            testID='inputSubfield'
            textAlign='center'
            inputMode='numeric'
            maxLength={3}
            placeholder='000'
            value={inputTexts[0]}
            onChangeText = {(value) => checkLimit(value, 0)}
            onSubmitEditing = {() => {
              secondTextInput.current?.focus()
              props.SaveCallback(inputTexts)
            }}
            onEndEditing={() => {
              props.SaveCallback(inputTexts)
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
            maxLength={3}
            placeholder='00'
            value={inputTexts[1]}
            onChangeText = {(value) => checkLimit(value, 1)}
            ref={secondTextInput}
            onSubmitEditing = {() => {
              thirdTextInput.current?.focus()
              props.SaveCallback(inputTexts)
            }}
            onEndEditing={() => {
              props.SaveCallback(inputTexts)
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
            maxLength={3}
            placeholder='00'
            value={inputTexts[2]}
            onChangeText = {(value) => checkLimit(value, 2)}
            ref={thirdTextInput}
            onSubmitEditing = {() => {
              props.SaveCallback(inputTexts)
            }}
            onEndEditing={() => {
              props.SaveCallback(inputTexts)
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
      flexDirection: 'row',
      paddingRight: 10,
      borderRadius: 5
    },
  
    textInputStyle: {
      fontSize: 20,
      alignContent: 'center',
      justifyContent: 'center',
    },
  
    text: {
      fontSize: 20,
      marginTop: 6,
    }
  })
