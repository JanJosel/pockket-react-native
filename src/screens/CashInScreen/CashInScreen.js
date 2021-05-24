import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function CashInScreen(props) {
    const [cashInAmount, setCashInAmount] = useState('')

    const navigation = props.navigation
    const userID = props.route.params.userID;
    const userDocRef = firebase.firestore().collection("users").doc(userID)

    const cashIn = async () => {
        if(isNaN(cashInAmount)) {
            alert("Please enter a valid amount")
            return
        }
        else if(Number(cashInAmount) <= 0) {
            alert("Amount must be greater than 0")
            return
        }
        else {
            await userDocRef.update({
                balance: firebase.firestore.FieldValue.increment(Number(cashInAmount).toFixed(2))
            });
            alert('Cash In was successful')
            navigation.navigate("Dashboard")
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Cash In Amount'
                    onChangeText={(text) => setCashInAmount(text)}
                    value={cashInAmount}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => cashIn()}
                >
                    <Text style={styles.buttonTitle}>Cash in</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}
