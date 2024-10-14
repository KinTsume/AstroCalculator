import React from 'react';
import {View, Text, Image, useColorScheme} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';

import Ionicons from "react-native-ionicons";

import ManualInputScreen from '../manualInputScreen/ManualInputScreen';
import SearchInputScreenNavigator from '../searchInputScreenNavigator/SearchInputScreenNavigator'
import OptionsScreen from '../optionsScreen/OptionsScreen';

import { DARK, LIGHT } from '../../assets/ColorPalettes';

const Tab = createBottomTabNavigator()

export default function AppNavigator(): React.JSX.Element{

  const isDarkMode = useColorScheme() === 'dark'

  const themeColors = isDarkMode ? DARK : LIGHT

  const manualInputIcon = <View testID='navIcon'><Icon source={'pencil-outline'} size={30} color={themeColors.NavigationContainer.Icons}/></View>
  const autoInputIcon = <View testID='navIcon'><Icon source={'magnify'} size={30} color={themeColors.NavigationContainer.Icons}/></View>
  const optionsIcon = <View testID='navIcon'><Icon source={'cog-outline'} size={30} color={themeColors.NavigationContainer.Icons} /></View>

  return(
    <Tab.Navigator 
      initialRouteName='manualInput'
      sceneContainerStyle={{backgroundColor: themeColors.NavigationContainer.Background}}
      screenOptions={{
        headerShown: false,
        tabBarStyle:{
          backgroundColor: themeColors.NavigationContainer.Background
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