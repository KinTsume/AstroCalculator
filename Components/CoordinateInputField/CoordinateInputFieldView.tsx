import { TextInput, Text, View, StyleSheet } from 'react-native'

import { ManualInputScreenColors } from '../../assets/ColorPalettes'

import { InputFieldProps } from './useCoordinateInputField'

interface InputFieldPropsView extends InputFieldProps {
    ReferenceComponent: (component: TextInput | null, orderNum: number) => void,
    FocusComponent: (componentOrderNum: number) => void
}

const CoordinateInputFieldView = (props: InputFieldPropsView) => {
    const themeColors = props.themeColors

    return (
        <View style={[props.style, styles.container, {backgroundColor: themeColors.PropertyInput}]}>
            <TextInput 
            textAlign='center'
            inputMode='numeric'
            maxLength={3}
            placeholder='000'
            onChangeText = {(value) => {props.SaveValues(props.orderNum, value)}}
            ref={(input) => {props.ReferenceComponent(input, props.orderNum)}}
            onSubmitEditing = {() => {props.FocusComponent(props.orderNum)}}
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
            onChangeText = {(value) => {props.SaveValues(2, value)}}
            ref={(input) => {props.ReferenceComponent(input, props.orderNum + 1)}}
            onSubmitEditing = {() => {props.FocusComponent(props.orderNum + 1)}}
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
            onChangeText = {(value) => {props.SaveValues(3, value)}}
            ref={(input) => {props.ReferenceComponent(input, props.orderNum + 2)}}
            onSubmitEditing = {() => {props.FocusComponent(props.orderNum + 2)}}
            placeholderTextColor={themeColors.PlaceholderTextColor}
            style={[styles.textInputStyle, {color: themeColors.TextColor}]}
            />
        
            <Text style={[styles.text, {color: themeColors.TextColor}]}>{props.textInfo[3]}</Text>
        </View>
      )
}

export default CoordinateInputFieldView

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
