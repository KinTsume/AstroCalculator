import React, { createContext, useState } from "react";
import { View, Text } from "react-native";
import { Searchbar } from "react-native-paper";
import CatalogueObjectCard, { CatalogueObject } from "../catalogueObjectCard/CatalogueObjectCard";

export interface SearchScreenViewProps {
    search: Array<CatalogueObject>,
    FetchSearchObjects(search: string): Promise<void>
}

export default function SearchScreenView(props: SearchScreenViewProps):React.JSX.Element {

    const [searchQuery, setSearchQuery] = useState('')

    const getSearch = (searchText: string) => {
        props.FetchSearchObjects(searchText)
    }

    const container = CatalogueObjectsContainer(props.search)

    return(
        <View>
            <Searchbar 
            testID="searchBar"
            placeholder="Type your search..." 
            onChangeText={setSearchQuery}
            onEndEditing={() => getSearch(searchQuery)}
            value={searchQuery}
            />
            
            {container}
        </View>
    )
}

const CatalogueObjectsContainer = (catalogueObjects: Array<CatalogueObject>) => {
    let cardsArray: Array<React.JSX.Element> = []

    for(let i = 0; i < catalogueObjects.length; i++){
        const element = catalogueObjects[i]
        cardsArray.push(<CatalogueObjectCard {...element}/>)
    }

    //console.log(catalogueObjects.length)
    //console.log(cardsArray)

    return(
        <View>
            <Text>Here I am</Text>
            {cardsArray}

        </View>
    )
}