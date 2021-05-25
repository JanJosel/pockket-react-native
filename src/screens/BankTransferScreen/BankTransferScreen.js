import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function BankTransferScreen(props) {

    const [accountNumber, setAccountNumber] = useState('')
    const [accountName, setAccountName] = useState('')
    const [bankTransferAmount, setBankTransferAmount] = useState('')

    const navigation = props.navigation
    const userID = props.route.params.userID;
    const transactions = firebase.firestore().collection("transactions")
    const userDocRef = firebase.firestore().collection("users").doc(userID)

    const bankTransfer = async () => {
        
        let fields = await userDocRef.get();

        if(isNaN(bankTransferAmount) || isNaN(accountNumber) || accountNumber=='' || accountName=='') {
            alert("Please enter a valid input")
            return
        }
        else if(Number(bankTransferAmount) <= 10) {
            alert("Amount must be greater than 10 pesos")
            return
        }
        else if(Number(bankTransferAmount) > 50000) {
            alert("Exceed maximum amount for transfer")
            return
        }
        else if(Number(fields.data().balance)-Number(bankTransferAmount) < 0) {
            alert('Failed transaction - Not enought balance')
            return
        }
        else {
            try {
                await transactions.add({
                    sender: userID,
                    receiver: accountNumber,
                    amount: Number(bankTransferAmount).toFixed(2),
                    bitsEarned: 1,
                    type: 'Bank Transfer',
                    date: new Date().getTime()
                });
                await userDocRef.update({
                    balance: firebase.firestore.FieldValue.increment(-Number(bankTransferAmount).toFixed(2)),
                    bits: firebase.firestore.FieldValue.increment(1.00)
                });
                alert('Bank Transfer was successful')
                navigation.navigate("Dashboard")
            } catch (error) {
                alert('Bank Transfer failed')
            }
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
                    placeholder='Enter Amount'
                    onChangeText={(text) => setBankTransferAmount(text)}
                    value={bankTransferAmount}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType="number-pad"
                />
                <Text style={{textAlign:"center"}}>Maximum of PHP 50,000.00</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Enter account number'
                    onChangeText={(text) => setAccountNumber(text)}
                    value={accountNumber}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType="number-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Enter account name'
                    onChangeText={(text) => setAccountName(text)}
                    value={accountName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType="number-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Enter email for receipt (optional)'
                    // onChangeText={(text) => setBuyLoadAmount(text)}
                    // value={buyLoadAmount}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType="number-pad"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => bankTransfer()}
                >
                    <Text style={styles.buttonTitle}>Transfer</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}