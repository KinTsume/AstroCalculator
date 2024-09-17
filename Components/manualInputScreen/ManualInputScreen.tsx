import {View, Text, StyleSheet, useColorScheme} from 'react-native'

import ManualInputField from '../manualInputField/ManualInputField'

import { DARK, LIGHT, ManualInputScreenColors } from '../../assets/ColorPalettes'

export default function ManualInputScreen() {
  
  const isDarkMode = useColorScheme() === 'dark'

  const themeColors = isDarkMode ? DARK.ManualInputScreen : LIGHT.ManualInputScreen

  console.log(themeColors)

  return (
    <View testID='ManualInputScreen' style={[styles.container, {backgroundColor: themeColors.Background}]}>
      <Text style={styles.title}>Manual input</Text>
      <ManualInputField 
      themeColors={themeColors}
      fieldName='hour angle'
      fieldUnits={['h', 'm', 's']} 
      unitsMaxValue={[24, 60, 60]}
      style={styles.paragraph} />

      <ManualInputField
      themeColors={themeColors}
      fieldName='declination'
      fieldUnits={['º', '´', '´´']} 
      unitsMaxValue={[360, 60, 60]}
      style={styles.paragraph} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingVertical: 20
  },
  title: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  paragraph: {
    flex: 1,
    justifyContent: 'center',
    margin: 24,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  themeView: {
    flex: 1
  }
});