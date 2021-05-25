import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, FlatList, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function PockketTraceScreen(props) {
    const [date, setDate] = useState(new Date());
    const [expenseData, setExpenseData] = useState([]);

    const navigation = props.navigation
    const userID = props.route.params.userID;

    const transactions = firebase.firestore().collection("transactions")

    useEffect(() => {
        let unsubRef = transactions.where("sender", "==", userID)
            .onSnapshot((querySnapshot) => {
                let expenses = [];
                querySnapshot.forEach((doc) => {
                    expenses.push({...doc.data(), id: doc.id});
                });
                setExpenseData(expenses);
                console.log(expenses);
            });
        
        return () => unsubRef();
    }, [])

    const renderItem = ({ item }) => (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '50%', backgroundColor: 'gray'}}>
                <Text>{item.type}</Text>
                <Text>{item.receiver}</Text>
            </View>
            <View style={{width: '50%', backgroundColor: 'red'}}>
                <Text>{item.type}</Text>
                <Text>{item.receiver}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                style={{width: '100%'}}
                data={expenseData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}