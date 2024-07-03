import {View, Text, TextInput, StyleSheet, useColorScheme} from 'react-native'

import { ObjectInfo } from '../ObjectInfo'

import { DARK, LIGHT } from '../../assets/ColorPalettes'

interface SkyObjects{
    name: string,
    altname: string,
    declination: string,
    rightAscension: string
}

interface SearchInputScreenViewProps {
    ShowSearchObject: () => void
}


const SearchInputScreenView = (props: SearchInputScreenViewProps) => {
    const isDarkMode = useColorScheme() === 'dark'

    const themeColors = isDarkMode ? DARK.SearchInputScreen : LIGHT.SearchInputScreen

    return (
        <View style={[styles.container, {backgroundColor: themeColors.Background}]}>
          <View style={[styles.inputContainer, {backgroundColor: themeColors.SearchInputContainer}]}>
              <TextInput 
              textAlign='center'
              placeholder='Type the object name'
              placeholderTextColor={themeColors.PlaceholderTextColor}
              onSubmitEditing={(event) => {
                  var inputText = event.nativeEvent.text
                  props.ShowSearchObject()
              }}
              style={[styles.inputText, {backgroundColor: themeColors.SearchInput, color: themeColors.TextColor}]}
              />
          </View>
        </View>
    )
}

export default SearchInputScreenView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    paddingVertical: 20
  },
  inputContainer: {
    fontSize: 20,
    padding: 15,
    borderRadius: 20
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
  inputText: {
    padding: 10,
    borderRadius: 10
  }
});