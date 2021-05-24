import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function BuyLoadScreen(props) {
    const [mobileNumber, setMobileNumber] = useState('')
    const [buyLoadAmount, setBuyLoadAmount] = useState('')

    const navigation = props.navigation
    const userID = props.route.params.userID;
    const transactions = firebase.firestore().collection("transactions")
    const userDocRef = firebase.firestore().collection("users").doc(userID)

    const buyLoad = async () => {
        
        let fields = await userDocRef.get();

        if(isNaN(buyLoadAmount) || isNaN(mobileNumber) || mobileNumber=='') {
            alert("Please enter a valid input")
            return
        }
        else if(Number(buyLoadAmount) <= 10) {
            alert("Amount must be greater than 10 pesos")
            return
        }
        else if(Number(fields.data().balance)-Number(buyLoadAmount) < 0) {
            alert('Failed transaction - Not enought balance')
            return
        }
        else {
            await transactions.add({
                sender: userID,
                receiver: mobileNumber,
                amount: Number(buyLoadAmount).toFixed(2),
                bitsEarned: 1,
                type: 'buyLoad'
            });
            await userDocRef.update({
                balance: firebase.firestore.FieldValue.increment(-Number(buyLoadAmount).toFixed(2)),
                bits: firebase.firestore.FieldValue.increment(1.00)
            });
            alert('Buy Load was successful')
            navigation.navigate("Dashboard")
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Text style={{textAlign:"center"}}>Buy load for</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Mobile Number'
                    onChangeText={(text) => setMobileNumber(text)}
                    value={mobileNumber}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType="number-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Enter Amount'
                    onChangeText={(text) => setBuyLoadAmount(text)}
                    value={buyLoadAmount}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType="number-pad"
                />
                <Text style={{textAlign:"center"}}>Minimum amount is 10.</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => buyLoad()}
                >
                    <Text style={styles.buttonTitle}>Buy Load</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}