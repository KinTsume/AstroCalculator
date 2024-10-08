import { TextInput, Text, View, StyleSheet } from 'react-native'
import { useRef, useState } from 'react'

import { ManualInputScreenColors } from '../../assets/ColorPalettes'

export interface InputFieldProps{
  fieldUnits: string[],
  unitsMaxValue: number[],
  saveIndex: number,
  themeColors: ManualInputScreenColors,
  SaveCoordinates: (index: number, value: string[]) => void
}

const CoordinateInputField = (props: InputFieldProps) => {
    const secondTextInput = useRef<TextInput>(null)
    const thirdTextInput = useRef<TextInput>(null)

    const [inputTexts, setInputTexts] = useState(['0', '0', '0']);

    const themeColors = props.themeColors

    return (
        <View testID='coordinateInputField' style={[styles.container, {backgroundColor: themeColors.PropertyInput}]}>
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
              props.SaveCoordinates(props.saveIndex, inputTexts)
            }}
            onEndEditing={() => {
              props.SaveCoordinates(props.saveIndex, inputTexts)
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
              props.SaveCoordinates(props.saveIndex, inputTexts)
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
              props.SaveCoordinates(props.saveIndex, inputTexts)
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
