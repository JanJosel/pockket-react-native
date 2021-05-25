import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';  
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';

export default function PayBillsScreen(props) {
    const navigation = props.navigation
    const userID = props.route.params.userID;


    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>
                Biller Categories
            </Text>
            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>

                <View style={{flexDirection:'column'}}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate("Select Biller", {userID: userID, billerCategory: "electricUtilities"})} 
                        style={styles.buttonLoginTouchable}
                    >
                        <FontAwesome name="lightbulb-o" size={50} color="#e91e63" />
                        <Text style={styles.serviceButtonText}>Electric{"\n"}Utilities</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => 
                        navigation.navigate("Select Biller", {userID: userID, billerCategory: "telecoms"})} 
                        style={styles.buttonLoginTouchable}
                    >
                        <Entypo name="phone" size={50} color="#e91e63" />
                        <Text style={styles.serviceButtonText}>Telecoms</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => 
                        navigation.navigate("Select Biller", {userID: userID, billerCategory: "healthcare"})} 
                        style={styles.buttonLoginTouchable}
                    >
                        <FontAwesome5 name="hand-holding-medical" size={44} color="#e91e63" style={{marginBottom:2}}/>
                        <Text style={styles.serviceButtonText}>Healthcare</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'column'}}>
                    <TouchableOpacity onPress={() => 
                        navigation.navigate("Select Biller", {userID: userID, billerCategory: "waterUtilities"})} 
                        style={styles.buttonLoginTouchable}
                    >
                        <MaterialCommunityIcons name="water-pump" size={50} color="#e91e63" style={{marginBottom:1}}/>
                        <Text style={styles.serviceButtonText}>Water{"\n"}Utilities</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => 
                        navigation.navigate("Select Biller", {userID: userID, billerCategory: "realEstate"})} 
                        style={styles.buttonLoginTouchable}
                    >
                        <FontAwesome name="building" size={50} color="#e91e63" style={{marginBottom:4}}/>
                        <Text style={styles.serviceButtonText}>Real Estate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => 
                        navigation.navigate("Select Biller", {userID: userID, billerCategory: "schools"})} 
                        style={styles.buttonLoginTouchable}
                    >
                        <MaterialIcons name="school" size={50} color="#e91e63" />
                        <Text style={styles.serviceButtonText}>Schools</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'column'}}>
                    <TouchableOpacity onPress={() => 
                        navigation.navigate("Select Biller", {userID: userID, billerCategory: "cableInternet"})} 
                        style={styles.buttonLoginTouchable}
                    >
                        <MaterialIcons name="connected-tv" size={50} color="#e91e63" />
                        <Text style={styles.serviceButtonText}>Cable/{"\n"}Internet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => 
                        navigation.navigate("Select Biller", {userID: userID, billerCategory: "transportation"})} 
                        style={styles.buttonLoginTouchable}
                    >
                        <FontAwesome name="bus" size={50} color="#e91e63" style={{marginBottom:4}}/>
                        <Text style={styles.serviceButtonText}>Transportation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert("Other categories coming soon...")} style={styles.buttonLoginTouchable}>
                        <MaterialCommunityIcons name="dots-horizontal" size={50} color="#e91e63" />
                        <Text style={styles.serviceButtonText}>Others</Text>
                    </TouchableOpacity>
                </View>

                
            </View>
        </View>
    )
}