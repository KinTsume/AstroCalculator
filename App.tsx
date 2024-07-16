import { NavigationContainer } from '@react-navigation/native'

import AppNavigator from './components/appNavigator/AppNavigator'
import { Text } from 'react-native'

export default function App(){
  return(
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  )
}