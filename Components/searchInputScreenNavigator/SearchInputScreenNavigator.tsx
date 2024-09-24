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

const SearchInputScreenNavigator = (props: SearchInputScreenNavigatorViewProps) => {

    const {ChangeObject, selectedCard, ...homeScreenProps} = props
    const searchScreenProps = {ChangeObject}
    
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="SearchInputScreen" component={SearchInputScreen} 
            />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
    )
}

export default SearchInputScreenNavigator