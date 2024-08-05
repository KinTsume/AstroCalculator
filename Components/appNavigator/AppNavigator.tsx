import React from 'react';
import {View, Text, Image, useColorScheme} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from "react-native-ionicons";

import ManualInputScreen from '../manualInputScreen/ManualInputScreen';
import SearchInputScreenNavigator from '../searchInputScreenNavigator/SearchInputScreenNavigator'
import { OptionsScreen } from '../optionsScreen/OptionsScreen';

import { DARK, LIGHT } from '../../assets/ColorPalettes';

const Tab = createBottomTabNavigator()

export default function AppNavigator(): React.JSX.Element{

  const isDarkMode = useColorScheme() === 'dark'

  const themeColors = isDarkMode ? DARK.NavigationContainer : LIGHT.NavigationContainer

  const manualInputIcon = <Ionicons testID='navIcon' name={'pencil-outline'} size={30} color={themeColors.Icons}/>
  const autoInputIcon = <Ionicons name={'search-outline'} size={30} color={themeColors.Icons} />
  const optionsIcon = <Ionicons name={'settings-outline'} size={30} color={themeColors.Icons} />

  return(
    <Tab.Navigator 
      initialRouteName='manualInput'
      sceneContainerStyle={{backgroundColor: themeColors.Background}}
      screenOptions={{
        headerShown: false,
        tabBarStyle:{
          backgroundColor: themeColors.Background
        },
      }}>

      <Tab.Screen 
      name='Manual Input' 
      component={ManualInputScreen}
      options={{
        tabBarIcon: ({focused}) => 
        {
          return manualInputIcon
        }
      }}
      />
      <Tab.Screen 
      name='Search Input' 
      component={SearchInputScreenNavigator}
      options={{
        tabBarIcon: ({focused}) => 
        {
          return autoInputIcon
        }
      }}
      />
      <Tab.Screen 
      name='Options' 
      component={OptionsScreen}
      options={{
        tabBarIcon: ({focused}) => 
        {
          return optionsIcon
        }
      }}
      />
    </Tab.Navigator>
  )
}