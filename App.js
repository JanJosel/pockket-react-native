import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { firebase } from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { 
  LoginScreen, 
  HomeScreen, 
  RegistrationScreen, 
  CashInScreen,
  BuyLoadScreen,
  PayBillsScreen,
  PayBillsScreenBiller
} from './src/screens'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    const authListener = firebase.auth().onAuthStateChanged(user => {
      // user logged in
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setUser(null)
        setLoading(false)
      }
    });

    return authListener;
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <>
            <Stack.Screen name="Dashboard">
              {props => <HomeScreen {...props} userData={user} />}
            </Stack.Screen>
            <Stack.Screen name="Cash In" component={CashInScreen} />
            <Stack.Screen name="Pay Bills" component={PayBillsScreen} />
            <Stack.Screen name="Select Biller" component={PayBillsScreenBiller} />
            <Stack.Screen name="Buy Load" component={BuyLoadScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
