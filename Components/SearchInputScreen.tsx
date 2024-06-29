import {View, Text, TextInput, StyleSheet, useColorScheme} from 'react-native'

import { ObjectInfo } from './ObjectInfo'

import { DARK, LIGHT } from '../assets/ColorPalettes'

import { POSTSearch } from '../assets/ServerMock'

interface SkyObjects{
    name: string,
    altname: string,
    declination: string,
    rightAscension: string
}

export const SearchInputScreen = () => {

    const isDarkMode = useColorScheme() === 'dark'

    const themeColors = isDarkMode ? DARK.SearchInputScreen : LIGHT.SearchInputScreen

    const SearchedObjects: Array<SkyObjects> = []

    const ShowSearchObjects = (searchText: string) => {
        GetSearchedObjects(searchText)
    }

    return (
        <View style={[styles.container, {backgroundColor: themeColors.Background}]}>
        <View style={[styles.inputContainer, {backgroundColor: themeColors.SearchInputContainer}]}>
            <TextInput 
            textAlign='center'
            placeholder='Type the object name'
            placeholderTextColor={themeColors.PlaceholderTextColor}
            onSubmitEditing={(event) => {
                var inputText = event.nativeEvent.text
                ShowSearchObjects(inputText)
            }}
            style={[styles.inputText, {backgroundColor: themeColors.SearchInput, color: themeColors.TextColor}]}
            />
        </View>

        <View>
            <ObjectInfo
            name={SearchedObjects[0].name}
            altName={SearchedObjects[0].altname}
            declination={SearchedObjects[0].declination}
            rightAscension={SearchedObjects[0].rightAscension}
            />
        </View>

        <ObjectInfo
        name={SearchedObjects[1].name}
        altName={SearchedObjects[1].altname}
        declination={SearchedObjects[1].declination}
        rightAscension={SearchedObjects[1].rightAscension}
        />
        
        <ObjectInfo
        name={SearchedObjects[2].name}
        altName={SearchedObjects[2].altname}
        declination={SearchedObjects[2].declination}
        rightAscension={SearchedObjects[2].rightAscension}
        />
        </View>
    )
}

const GetSearchedObjects = (searchText: string) => {
    /*fetch('<API address>',{
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        search: searchString
        })
    })*/
    stars
    return stars
}

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