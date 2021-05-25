import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';
import {billers} from '../../constants/billers'
import { firebase } from '../../firebase/config'

export default function PayBillsScreenBiller(props) {
    const [selectedValue, setSelectedValue] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [accountName, setAccountName] = useState('')
    const [payBillAmount, setPayBillAmount] = useState('')

    const navigation = props.navigation
    const userID = props.route.params.userID;
    const billerCategory = props.route.params.billerCategory;

    const transactions = firebase.firestore().collection("transactions")
    const userDocRef = firebase.firestore().collection("users").doc(userID)

    const payBill = async () => {
        const user = await userDocRef.get();

        if(accountNumber.trim() === '' || accountName.trim() === '' || payBillAmount.trim() === '') {
            alert("Please fill out all fields")
            return
        }
        else if(isNaN(payBillAmount)) {
            alert("Please enter a valid amount")
            return
        }
        else if(Number(payBillAmount) <= 0) {
            alert("Amount must be greater than 0")
            return
        }
        else if(Number(user.data().balance)-Number(payBillAmount) < 0) {
            alert('Failed transaction - Not enought balance')
            return
        }
        else {
            try {
                await transactions.add({
                    sender: userID,
                    receiver: selectedValue,
                    amount: Number(payBillAmount).toFixed(2),
                    bitsEarned: 1,
                    type: 'Pay Bill',
                    date: new Date().getTime()
                });
                await userDocRef.update({
                    balance: firebase.firestore.FieldValue.increment(-Number(payBillAmount).toFixed(2)),
                    bits: firebase.firestore.FieldValue.increment(1.00)
                });
                alert('Pay Bill was successful')
                navigation.navigate("Dashboard")
            } catch (error) {
                alert('Pay Bill failed')
            }
        }
    }

    return (
        <View style={styles.container}>
            {billers[billerCategory] ? 
                    <Picker
                        selectedValue={selectedValue}
                        style={{ height: 50, width: '80%' }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="" value="" />
                        {billers[billerCategory].map(biller => <Picker.Item label={biller} value={biller} />)}
                    </Picker>
                    :
                    <Text>No billers available under selected category.</Text>
            }

            {selectedValue != '' &&
                <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%' }}
                    keyboardShouldPersistTaps="always"
                >
                    <Text style={{textAlign:"center"}}>Payment will be posted within 3 business days.</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Account Number'
                        onChangeText={(text) => setAccountNumber(text)}
                        value={accountNumber}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        keyboardType="number-pad"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Account Name'
                        onChangeText={(text) => setAccountName(text)}
                        value={accountName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Enter Amount'
                        onChangeText={(text) => setPayBillAmount(text)}
                        value={payBillAmount}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        keyboardType="number-pad"
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => payBill()}
                    >
                        <Text style={styles.buttonTitle}>Pay Bill</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            }
        </View>
    )
}