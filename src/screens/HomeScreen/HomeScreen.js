import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, SectionList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';  
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import styles from './styles';
import { firebase } from '../../firebase/config'

let unsubRef; 

export default function HomeScreen(props) {
    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    const userID = props.extraData.id

    useEffect(() => {
        unsubRef = entityRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const signOut = () => {
        try {
            // unsub from collection
            unsubRef()
            // sign out
            firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }

    const renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {index}. {item.text}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>
                    POCKKET ACCOUNT
                </Text>
                <Text style={styles.cardValue}>
                    PHP 27,000.00
                </Text>
                <Text style={{marginBottom: 10}}>
                    Available balance
                </Text>
                <Text style={styles.cardValue}>
                    PB 420
                </Text>
                <Text>
                    Available bits
                </Text>
            </View>
            <View>
                <Text style={styles.sectionTitle}>
                    Send Money
                </Text>
            </View>
            <View>
                <Text style={styles.sectionTitle}>
                    Services
                </Text>
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>

                    <View style={{flexDirection:'column'}}>
                        <TouchableOpacity style={styles.buttonLoginTouchable}>
                            <Entypo name="text-document" size={38} color="#e91e63" />
                            <Text style={styles.serviceButtonText}>Pay{"\n"}Bills</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonLoginTouchable}>
                            <FontAwesome name="bank" size={40} color="#e91e63" style={{marginBottom:3}} />
                            <Text style={styles.serviceButtonText}>Bank{"\n"}Transfer</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'column'}}>
                        <TouchableOpacity style={styles.buttonLoginTouchable}>
                            <FontAwesome name="qrcode" size={40} color='#e91e63' />
                            <Text style={styles.serviceButtonText}>Pay{"\n"}QR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonLoginTouchable}>
                            <FontAwesome name="cc-paypal" size={44} color="#e91e63" />
                            <Text style={styles.serviceButtonText}>Link{"\n"}Paypal</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'column'}}>
                        <TouchableOpacity style={styles.buttonLoginTouchable}>
                            <MaterialCommunityIcons name="android-messages" size={40} color="#e91e63" />
                            <Text style={styles.serviceButtonText}>Buy{"\n"}Load</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonLoginTouchable}>
                            <FontAwesome5 name="coins" size={40} color="#e91e63" />
                            <Text style={styles.serviceButtonText}>Pockket{"\n"}Bits</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'column'}}>
                        <TouchableOpacity style={styles.buttonLoginTouchable}>
                            <FontAwesome name="money" size={40} color="#e91e63" />
                            <Text style={styles.serviceButtonText}>Fund{"\n"}Transfer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonLoginTouchable}>
                            <Entypo name="area-graph" size={40} color="#e91e63" />
                            <Text style={styles.serviceButtonText}>Pockket{"\n"}Trace</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={signOut}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            {/* <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new entity'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            { entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )} */}
        </View>
    )
}
