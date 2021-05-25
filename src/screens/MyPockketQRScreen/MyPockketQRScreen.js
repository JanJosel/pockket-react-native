import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import SvgQRCode from 'react-native-qrcode-svg';

export default function MyPockketQRScreen(props) {

    const navigation = props.navigation
    const userNumber = props.route.params.userNumber

    function LogoFromFile() {
        let logoFromFile = require('../../../assets/icon.png');
      
        return <SvgQRCode value={`pockket://payQR/${userNumber}`} logo={logoFromFile} size={300} />;
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">

                <View style={{alignItems: 'center'}}>
                    <LogoFromFile />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Dashboard")}
                >
                    <Text style={styles.buttonTitle}>Back to Dashboard</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}