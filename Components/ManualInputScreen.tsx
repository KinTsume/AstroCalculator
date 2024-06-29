import {View, Text, StyleSheet, useColorScheme} from 'react-native'

import { DistanceCalculator } from './DistanceCalculator'

import { DARK, LIGHT } from '../assets/ColorPalettes'

export const ManualInputScreen = () => {
  
  const isDarkMode = useColorScheme() === 'dark'

  const themeColors = isDarkMode ? DARK.ManualInputScreen : LIGHT.ManualInputScreen

  return (
    <View style={[styles.container, {backgroundColor: themeColors.Background}]}>
      <Text style={styles.title}>Astronomical relative position calculator</Text>
      <DistanceCalculator 
      themeColors={themeColors}
      isHourAngle={true} 
      textInfo={['hour angle', 'h', 'm', 's']} 
      style={styles.paragraph} />

      <DistanceCalculator
      themeColors={themeColors} 
      isHourAngle={false}
      textInfo={['declination', 'º', '´', '´´']} 
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