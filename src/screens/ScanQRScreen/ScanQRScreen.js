import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from './styles';


export default function ScanQRScreen(props) {
    const navigation = props.navigation
    const userID = props.route.params.userID;

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const qrStartString = 'pockket://payQR/';

    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);
    
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        if(data.startsWith(qrStartString)) {
            const qrReceiverNumber = data.replace(qrStartString, "");
            navigation.navigate("Fund Transfer", {userID: userID, qrReceiverNumber: qrReceiverNumber})
        }
        else {
            alert(`Non-Pockket Bar code with type ${type} and data ${data} has been scanned!`);
        }
    };
    
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    )
}