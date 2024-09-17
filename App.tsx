import { NavigationContainer } from '@react-navigation/native'

import AppNavigator from './components/appNavigator/AppNavigator'

export default function App(){
  return(
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  )
}