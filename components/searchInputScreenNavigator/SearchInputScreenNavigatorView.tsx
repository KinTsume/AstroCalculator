import React, { useRef, createContext } from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchInputScreen from "../searchInputScreen/SearchInputScreen";
import SearchScreen from '../searchScreen/SearchScreen'
import { CatalogueObject } from "../catalogueObjectCard/CatalogueObjectCard";

interface SearchInputScreenNavigatorViewProps {
    originObject: CatalogueObject, 
    targetObject: CatalogueObject,
    SetObject: (catalogueObject: CatalogueObject, positionToSet: string) => void,
} 

const Stack = createNativeStackNavigator();

const SearchInputScreenNavigatorView = (props: SearchInputScreenNavigatorViewProps) => {

    const {SetObject, ...homeScreenProps} = props
    const searchScreenProps = {SetObject}

    const InputScreen = (inputProps: any) => (<SearchInputScreen 
        navigation={inputProps.navigation} 
        route={inputProps.route}
        {...props} />)
    
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="SearchInputScreen" component={InputScreen} 
            />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
    )
}

export default SearchInputScreenNavigatorView