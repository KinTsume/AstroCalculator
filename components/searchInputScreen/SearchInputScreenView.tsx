import { View, SafeAreaView, Text, StyleSheet, useColorScheme } from 'react-native'
import { IconButton } from 'react-native-paper';

import CatalogueObjectCard from '../catalogueObjectCard/CatalogueObjectCard';
import { CatalogueObject } from '../catalogueObjectCard/CatalogueObjectCard'

import { DARK, LIGHT } from '../../assets/ColorPalettes'

export interface SearchInputScreenProps {
  originObject: CatalogueObject,
  targetObject: CatalogueObject,
  resultRA: number[],
  resultDE: number[],
  navigation: any,
  ChangeObject: (catalogueObject: CatalogueObject) => void
}

const SearchInputScreenView = (props: SearchInputScreenProps) => {
    const isDarkMode = useColorScheme() === 'dark'

    const themeColors = isDarkMode ? DARK.SearchInputScreen : LIGHT.SearchInputScreen

    //const SearchButton = () => <Ionicons testID='SearchIcon' name='search-outline' size={10} color={themeColors.Icons}/>
    const SearchButton = (props: any) => <IconButton testID='SearchIcon' icon='database-search-outline' size={50} iconColor={themeColors.Icons} 
    onPress={() => {
      props.navigation.replace('SearchScreen', {position: props.objectPosition})
    }}></IconButton>

    return (
      <SafeAreaView testID='SearchInputScreen' style={[styles.container, {backgroundColor: themeColors.Background}]}>
        <Text style={styles.title}>Search input</Text>

        <View style={styles.cardField}>
          <View style={styles.search}>
            <SearchButton navigation={props.navigation} objectPosition='origin'/>
            <Text style={styles.fieldName}>Origin star</Text>
          </View>

          <CatalogueObjectCard {...props.originObject}/>
        </View>

        <View style={styles.cardField}>
          <View style={styles.search}>
            <SearchButton navigation={props.navigation} objectPosition='target'/>
            <Text style={styles.fieldName}>Target star</Text>
          </View>

          <CatalogueObjectCard {...props.targetObject}/>
        </View>

        <View style={styles.resultField}>
          <Text style={styles.fieldName}>Target relative position</Text>
          <Text style={styles.text}>{'RA: ' + props.resultRA[0] + 'h ' + props.resultRA[1] + 'm ' + props.resultRA[2] + 's'}</Text>
          <Text style={styles.text}>{'DE: ' + props.resultDE[0] + 'º ' + props.resultDE[1] + '\' ' + props.resultDE[2] + '"'}</Text>
        </View>
      </SafeAreaView>
    )
}

export default SearchInputScreenView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'green',
  },
  title: {
    flex: 0.1,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardField: {
    flex: 0.3, 
    paddingVertical: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  resultField: {
    flex: 0.1,
  },
  fieldName: {
    fontSize: 30,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  text: {
    fontSize: 20,
  }

});