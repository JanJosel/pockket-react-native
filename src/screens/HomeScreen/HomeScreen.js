import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';  
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import styles from './styles';
import { firebase } from '../../firebase/config';

export default function HomeScreen(props) {
    const [userBalance, setUserBalance] = useState(0)
    const [userBits, setUserBits] = useState(0);

    const navigation = props.navigation
    const userID = props.userData.id
    const userNumber = props.userData.phoneNumber
    const userDocRef = firebase.firestore().collection("users").doc(userID)

    useEffect(() => {
        let unsubRef = userDocRef.onSnapshot((doc) => {
                setUserBalance(doc.data().balance);
                setUserBits(doc.data().bits)
            });
        
        return () => unsubRef();
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <View style={{width: '70%'}}>
                    <Text style={styles.cardTitle}>
                        POCKKET ACCOUNT
                    </Text>
                    <Text style={styles.cardValue}>
                        PHP {Number(userBalance).toFixed(2)}
                    </Text>
                    <Text style={{marginBottom: 10}}>
                        Available balance
                    </Text>
                    <Text style={styles.cardValue}>
                        PB {Number(userBits).toFixed(2)}
                    </Text>
                    <Text>
                        Available bits
                    </Text>
                </View>
                <View style={{width: "30%", alignItems: "center", justifyContent: "center"}}>
                    {/* cash in */}
                    <TouchableOpacity onPress={() => navigation.navigate("Cash In", {userID: userID})}>
                        <Entypo name="squared-plus" size={48} color="#f44336" />
                        <Text>Cash In</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View>
                <Text style={styles.sectionTitle}>
                    Services
                </Text>
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>

                    <View style={{flexDirection:'column'}}>
                        <TouchableOpacity onPress={() => navigation.navigate("Pay Bills", {userID: userID})} style={styles.buttonLoginTouchable}>
                            <Entypo name="text-document" size={38} color="#e91e63" />
                            <Text style={styles.serviceButtonText}>Pay{"\n"}Bills</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Bank Transfer", {userID: userID})} style={styles.buttonLoginTouchable}>
                            <FontAwesome name="bank" size={40} color="#e91e63" style={{marginBottom:3}} />
                            <Text style={styles.serviceButtonText}>Bank{"\n"}Transfer</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'column'}}>
                        <TouchableOpacity onPress={() => navigation.navigate("Pay QR", {userID: userID, userNumber: userNumber})} style={styles.buttonLoginTouchable}>
                            <FontAwesome name="qrcode" size={40} color='#e91e63' />
                            <Text style={styles.serviceButtonText}>Pay{"\n"}QR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => alert("Coming soon...")} style={styles.buttonLoginTouchable}>
                            <FontAwesome name="cc-paypal" size={44} color="#e91e63" />
                            <Text style={styles.serviceButtonText}>Link{"\n"}Paypal</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'column'}}>
                        <TouchableOpacity onPress={() => navigation.navigate("Buy Load", {userID: userID})} style={styles.buttonLoginTouchable}>
                            <MaterialCommunityIcons name="android-messages" size={40} color="#e91e63" />
                            <Text style={styles.serviceButtonText}>Buy{"\n"}Load</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Pockket Bits", {userID: userID, userBits: userBits})} style={styles.buttonLoginTouchable}>
                            <FontAwesome5 name="coins" size={40} color="#e91e63" />
                            <Text style={styles.serviceButtonText}>Pockket{"\n"}Bits</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'column'}}>
                        <TouchableOpacity onPress={() => navigation.navigate("Fund Transfer", {userID: userID})} style={styles.buttonLoginTouchable}>
                            <FontAwesome name="money" size={40} color="#e91e63" />
                            <Text style={styles.serviceButtonText}>Fund{"\n"}Transfer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Pockket Trace", {userID: userID})} style={styles.buttonLoginTouchable}>
                            <Entypo name="area-graph" size={40} color="#e91e63" />
                            <Text style={styles.serviceButtonText}>Pockket{"\n"}Trace</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        </View>
    )
}
