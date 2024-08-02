import {View, Text, TextInput, StyleSheet, useColorScheme} from 'react-native'
import Ionicons from "react-native-ionicons";

import CatalogueObjectCard from '../catalogueObjectCard/CatalogueObjectCard';
import { CatalogueObjectCardProps } from '../catalogueObjectCard/CatalogueObjectCard'

import { DARK, LIGHT } from '../../assets/ColorPalettes'


export interface SearchInputScreenProps {
  OriginObject: CatalogueObjectCardProps,
  TargetObject: CatalogueObjectCardProps,
  ResultRA: number[],
  ResultDE: number[]
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

        <CatalogueObjectCard {...props.OriginObject}/>

        <View>
          <Text>Target star</Text>
          <SearchButton/>
        </View>

        <CatalogueObjectCard {...props.TargetObject}/>

        <View>
          <Text>Target relative position</Text>
          <Text>{'RA: ' + props.ResultRA[0] + 'h ' + props.ResultRA[1] + 'm ' + props.ResultRA[2] + 's'}</Text>
          <Text>{'DE: ' + props.ResultDE[0] + 'º ' + props.ResultDE[1] + '\' ' + props.ResultDE[2] + '"'}</Text>
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