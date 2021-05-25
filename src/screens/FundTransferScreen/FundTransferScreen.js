import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function FundTransferScreen(props) {
    const [mobileNumber, setMobileNumber] = useState('')
    const [fundTransferAmount, setFundTransferAmount] = useState('')

    const navigation = props.navigation
    const userID = props.route.params.userID;
    const transactions = firebase.firestore().collection("transactions")
    const userDocRef = firebase.firestore().collection("users").doc(userID)
    const users = firebase.firestore().collection("users");

    const fundTransfer = async () => {
        const snapshot = await users.where('phoneNumber', '==', mobileNumber).get();
        if (snapshot.empty) {
            alert('Number did not match any user record');
            return;
        }  
        const receiverID = snapshot.docs[0].id
        const user = firebase.firestore().collection("users").doc(receiverID);

        const fields = await userDocRef.get();

        if(isNaN(fundTransferAmount) || isNaN(mobileNumber) || mobileNumber=='') {
            alert("Please enter a valid input")
            return
        }
        else if(Number(fundTransferAmount) <= 10) {
            alert("Amount must be greater than 10 pesos")
            return
        }
        else if(Number(fields.data().balance)-Number(fundTransferAmount) < 0) {
            alert('Failed transaction - Not enought balance')
            return
        }
        else {
            try {
                await transactions.add({
                    sender: userID,
                    receiver: mobileNumber,
                    amount: Number(fundTransferAmount).toFixed(2),
                    bitsEarned: 1,
                    type: 'Fund Transfer',
                    date: new Date().getTime()
                });
                await userDocRef.update({
                    balance: firebase.firestore.FieldValue.increment(-Number(fundTransferAmount).toFixed(2)),
                    bits: firebase.firestore.FieldValue.increment(1.00)
                });
                await user.update({
                    balance: firebase.firestore.FieldValue.increment(Number(fundTransferAmount).toFixed(2)),
                });
                alert('Fund Transfer was successful')
                navigation.navigate("Dashboard")
            } catch (error) {
                alert('Fund Transfer failed')
            }
        }
    }


    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Text style={{textAlign:"center"}}>*number must be linked to an existing Pockket Account</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Enter contact number'
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
                    onChangeText={(text) => setFundTransferAmount(text)}
                    value={fundTransferAmount}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType="number-pad"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => fundTransfer()}
                >
                    <Text style={styles.buttonTitle}>Transfer</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}