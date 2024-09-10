import {View, Text, TextInput, StyleSheet, useColorScheme} from 'react-native'
import Ionicons from "react-native-ionicons";

import CatalogueObjectCard from '../catalogueObjectCard/CatalogueObjectCard';
import { CatalogueObject } from '../catalogueObjectCard/CatalogueObjectCard'

import { DARK, LIGHT } from '../../assets/ColorPalettes'


export interface SearchInputScreenProps {
  originObject: CatalogueObject,
  targetObject: CatalogueObject,
  resultRA: number[],
  resultDE: number[]
}

const SearchInputScreen = (props: SearchInputScreenProps) => {
    const isDarkMode = useColorScheme() === 'dark'

    const themeColors = isDarkMode ? DARK.SearchInputScreen : LIGHT.SearchInputScreen

    const SearchButton = () => <Ionicons testID='SearchIcon' name={'search-outline'} size={30} color={themeColors.Icons}/>

    return (
      <View testID='SearchInputScreen' style={[styles.container, {backgroundColor: themeColors.Background}]}>
        <View>
          <Text>Origin star</Text>
          <SearchButton/>
        </View>

        <CatalogueObjectCard {...props.originObject}/>

        <View>
          <Text>Target star</Text>
          <SearchButton/>
        </View>

        <CatalogueObjectCard {...props.targetObject}/>

        <View>
          <Text>Target relative position</Text>
          <Text>{'RA: ' + props.resultRA[0] + 'h ' + props.resultRA[1] + 'm ' + props.resultRA[2] + 's'}</Text>
          <Text>{'DE: ' + props.resultDE[0] + 'º ' + props.resultDE[1] + '\' ' + props.resultDE[2] + '"'}</Text>
        </View>
      </View>
    )
}

export default SearchInputScreen

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