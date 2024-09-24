import React, { createContext, useState } from "react";
import { View, Text, ScrollView, StyleSheet, useColorScheme } from "react-native";
import { Searchbar } from "react-native-paper";
import CatalogueObjectCard, { CatalogueObject } from "../catalogueObjectCard/CatalogueObjectCard";

import { DARK, LIGHT } from "../../assets/ColorPalettes";

export interface SearchScreenViewProps {
    search: Array<CatalogueObject>,
    FetchSearchObjects(search: string): Promise<void>
}

export default function SearchScreenView(props: SearchScreenViewProps):React.JSX.Element {

    const isDarkMode = useColorScheme() === 'dark'

    const themeColors = isDarkMode ? DARK : LIGHT

    const [searchQuery, setSearchQuery] = useState('')

    const getSearch = (searchText: string) => {
        props.FetchSearchObjects(searchText)
    }

    const container = CatalogueObjectsContainer(props.search, themeColors.SearchInputScreen)

    return(
        <View style={{flex: 1, backgroundColor: themeColors.SearchInputScreen.Background}}>
            <Searchbar 
            testID="searchBar"
            placeholder="Type your search..." 
            onChangeText={setSearchQuery}
            onEndEditing={() => getSearch(searchQuery)}
            value={searchQuery}
            theme={{colors: {elevation: {level3: '#0f0f0f'}, onSurface: '#363f59'}}}
            />
            
            {container}
        </View>
    )
}

const CatalogueObjectsContainer = (catalogueObjects: Array<CatalogueObject>, themeColors: any) => {
    let cardsArray: Array<React.JSX.Element> = []

    console.log("Creating: " + catalogueObjects.length)

    for(let i = 0; i < catalogueObjects.length; i++){
        const element = catalogueObjects[i]
        cardsArray.push(
            <View key={i} style={[styles.cardContainer, {backgroundColor: themeColors.Background}]}>
                <Text style={{color: 'black'}}>Those ridiculous ties!</Text>
                <CatalogueObjectCard {...element}/>
            </View>
        )
    }

    //console.log(catalogueObjects.length)
    //console.log(cardsArray)

    return(
        <ScrollView style={styles.contentContainer}>
            {cardsArray}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    cardContainer: {
        flex: 0.2,
        padding: 5,
    },
})