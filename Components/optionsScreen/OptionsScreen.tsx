import {View, Text, StyleSheet} from 'react-native'

export const OptionsScreen = () => {
    return(
        <View testID='OptionsScreen' style={styles.optionsView}>
        </View>
    )
    
}

const styles = StyleSheet.create({
    optionsView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})