import React, { useRef, createContext } from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchInputScreen from "../searchInputScreen/SearchInputScreen";
import SearchScreen from '../searchScreen/SearchScreen'
import { CatalogueObject } from "../catalogueObjectCard/CatalogueObjectCard";

interface SearchInputScreenNavigatorViewProps {
    originObject: CatalogueObject, 
    targetObject: CatalogueObject,
    selectedCard: string,
    resultRA: number[], 
    resultDE: number[], 
    ChangeSelectedCard: (cardPosition: string) => void, 
    ChangeObject: (catalogueObject: CatalogueObject) => void
} 

const Stack = createNativeStackNavigator();

export default function SearchInputScreenNavigator(props: SearchInputScreenNavigatorViewProps):React.JSX.Element {

    const {ChangeObject, selectedCard, ...homeScreenProps} = props
    const searchScreenProps = {ChangeObject}

    const HomeScreenComponent = () => {return <SearchInputScreen {...homeScreenProps}/>}
    const SearchScreenComponent = () => {return <SearchScreen {...searchScreenProps}/>}
    
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreenComponent} />
            <Stack.Screen name="SearchScreen" component={SearchScreenComponent} />
        </Stack.Navigator>
    )
}