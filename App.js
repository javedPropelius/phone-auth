import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useRef, useState } from 'react'
import firebase from 'firebase/compat/app'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from './config';
//



export default function App() {
  const [code, setCode] = useState('123456');
  const [phoneNumber, setPhoneNumber] = useState('+91 1234567890');
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null)


  const sendVerification = async () => {

    console.log('phoneNumber: ' + phoneNumber)
    const phoneProvider = new firebase.auth.PhoneAuthProvider()
    // const phoneProvider = auth()
    await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then((res) => {
        console.log('res: ' + res)
        setVerificationId(res)
        Alert.alert('Plz enter OTP')
      });


  }

  const confirmCode = async () => {
    console.log('code: ' + code)
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code)
    console.log('credential', credential)
    await firebase.auth().signInWithCredential(credential)
      .then(() => {
        console.log('login successfully')
        Alert.alert('login successfully')
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View >
        <Text>Please enter phone Number</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder={'Phone number'}
          style={styles.input}
          keyboardType='phone-pad'
        />
        <Button onPress={sendVerification} title="Send otp" color="#841584" />

      </View>
      <View style={{ marginTop: 20 }} >
        <Text>Enter OTP</Text>
        <TextInput
          value={code}
          onChangeText={setCode}
          placeholder={'O T P'}
          style={styles.input}
          keyboardType='number-pad'
        />

        <Button
          onPress={confirmCode}
          title="Verify otp" color="green" />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },


  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#e8e8e8'
  },
});
