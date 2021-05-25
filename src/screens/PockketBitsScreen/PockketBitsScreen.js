import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function PockketBitsScreen(props) {
    const [conversionAmount, setConversionAmount] = useState('')

    const navigation = props.navigation
    const userID = props.route.params.userID;
    const userBits = props.route.params.userBits;
    const userDocRef = firebase.firestore().collection("users").doc(userID)

    const convertBits = async () => {
        if(conversionAmount.trim() === '') {
            alert("Please fill out all fields")
            return
        }
        else if(isNaN(conversionAmount)) {
            alert("Please enter a valid amount")
            return
        }
        else if(Number(conversionAmount) > Number(userBits)) {
            alert("Not enough bits for conversion")
            return
        }
        else {
            try {
                await userDocRef.update({
                    balance: firebase.firestore.FieldValue.increment(Number(conversionAmount).toFixed(2) * 10),
                    bits: firebase.firestore.FieldValue.increment(-Number(conversionAmount).toFixed(2))
                });
                alert('Bits Conversion was successful')
                navigation.navigate("Dashboard")
            } catch (error) {
                alert('Bits Conversion failed')
            }
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Text style={{textAlign:"center"}}>Available Bits: {userBits}</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Bits to be converted (1 Bit = PHP 10)'
                    onChangeText={(text) => setConversionAmount(text)}
                    value={conversionAmount}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType="number-pad"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => convertBits()}
                >
                    <Text style={styles.buttonTitle}>Convert</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}