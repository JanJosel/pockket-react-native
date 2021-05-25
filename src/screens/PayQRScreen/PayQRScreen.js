import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


export default function PayQRScreen(props) {

    const navigation = props.navigation
    const userID = props.route.params.userID;

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <TouchableOpacity
                    style={styles.button}
                    // onPress={() => buyLoad()}
                >
                    <MaterialCommunityIcons name="qrcode-scan" size={50} color="#e91e63" />
                    <Text style={styles.buttonTitle}>Scan QR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("My Pockket QR", {userID: userID})}
                >
                    <MaterialCommunityIcons name="qrcode-edit" size={50} color="#e91e63" />
                    <Text style={styles.buttonTitle}>Receive Money via QR</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}