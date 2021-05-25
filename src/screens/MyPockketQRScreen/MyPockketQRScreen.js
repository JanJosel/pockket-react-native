import React from 'react'
import { Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import SvgQRCode from 'react-native-qrcode-svg';

export default function MyPockketQRScreen(props) {

    const navigation = props.navigation
    const userID = props.route.params.userID;

    function LogoFromFile() {
        let logoFromFile = require('../../../assets/icon.png');
      
        return <SvgQRCode value={`pockket://payQR/${userID}`} logo={logoFromFile} size={300} />;
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">

                <View style={{alignItems: 'center'}}>
                    <LogoFromFile />
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}