import {View, Text, StyleSheet} from 'react-native'
import LocalCoordinateInput from '../localCoordinateInput/LocalCoordinateInput'

const OptionsScreen = () => {
    return(
        <View testID='OptionsScreen' style={styles.optionsView}>
            <LocalCoordinateInput />
        </View>
    )
    
}

export default OptionsScreen

const styles = StyleSheet.create({
    optionsView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})