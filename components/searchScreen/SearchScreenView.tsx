import React, { createContext, useState } from "react";
import { View, Text, ScrollView, StyleSheet, useColorScheme, TouchableHighlight } from "react-native";
import { Searchbar } from "react-native-paper";
import CatalogueObjectCard, { CatalogueObject } from "../catalogueObjectCard/CatalogueObjectCard";

import { DARK, LIGHT, SearchInputScreenColors } from "../../assets/ColorPalettes";

export interface SearchScreenViewProps {
    search: Array<CatalogueObject>,
    route: any,
    FetchSearchObjects(search: string): Promise<void>
    SetSearchedObject(object: CatalogueObject, position: string): void
}

export default function SearchScreenView(props: SearchScreenViewProps):React.JSX.Element {

    const isDarkMode = useColorScheme() === 'dark'

    const themeColors = isDarkMode ? DARK.SearchInputScreen : LIGHT.SearchInputScreen

    const [searchQuery, setSearchQuery] = useState('')

    const getSearch = (searchText: string) => {
        props.FetchSearchObjects(searchText)
    }

    const container = () => {
        return(
            <CatalogueObjectsContainer 
            catalogueObjects={props.search} 
            SetSearchedObjectCallback={(catalogueObject) => props.SetSearchedObject(catalogueObject, props.route.params.position)}
            themeColors={themeColors} 
            />
        )
    }

    return(
        <View style={{flex: 1, backgroundColor: themeColors.Background}}>
            <Searchbar 
            testID="searchBar"
            placeholder="Type your search..." 
            onChangeText={setSearchQuery}
            onEndEditing={() => getSearch(searchQuery)}
            value={searchQuery}
            theme={{colors: {elevation: {level3: '#0f0f0f'}, onSurface: '#363f59'}}}
            />
            
            {container()}
        </View>
    )
}

interface CatalogueObjectsContainerProps {
    catalogueObjects: Array<CatalogueObject>,
    SetSearchedObjectCallback: (object: CatalogueObject) => void,
    themeColors: SearchInputScreenColors
}
const CatalogueObjectsContainer = ({catalogueObjects, themeColors, SetSearchedObjectCallback}: CatalogueObjectsContainerProps) => {
    let cardsArray: Array<React.JSX.Element> = []

    for(let i = 0; i < catalogueObjects.length; i++){

        const element = catalogueObjects[i]
        cardsArray.push(
            <TouchableCard key={i} catalogueObject={element} SetSearchedObjectCallback={SetSearchedObjectCallback}  themeColors={themeColors} />
        )
    }

    return(
        <ScrollView style={styles.contentContainer}>
            {cardsArray}
        </ScrollView>
    )
}

interface TouchableCardProps {
    key: number,
    catalogueObject: CatalogueObject,
    SetSearchedObjectCallback:  (object: CatalogueObject) => void,
    themeColors: any
}

const TouchableCard = ({catalogueObject, SetSearchedObjectCallback, themeColors, ...props}: TouchableCardProps) => {

    const selectThisCatalogueObject = () => {
        SetSearchedObjectCallback(catalogueObject)
    }

    return(
        <TouchableHighlight testID="TouchableCard" key={props.key} onPress={() => selectThisCatalogueObject()} style={[styles.cardContainer, {backgroundColor: themeColors.Background}]}>
            <CatalogueObjectCard {...catalogueObject}/>
        </TouchableHighlight>
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