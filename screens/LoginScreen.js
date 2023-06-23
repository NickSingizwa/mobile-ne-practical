import React,{useState} from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import tw from 'tailwind-react-native-classnames';
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '../utils/api';
import axios from 'axios';

const LoginScreen = () => {
    const navigation = useNavigation();
    //form inputs handling
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleEmailChange = (text) => {
      setEmail(text);
    };
  
    const handlePassChange = (text) => {
      setPassword(text);
    };
 
    //on login button click
    const handleProceedLogin = async ()=>{
      //check if all fields are entered
        if (!email || !password) {
          Alert.alert('Validation Error', 'Please enter both email and password.');
          return;
        }
    
        //change the loading state and make login request to backend
        setLoading(true);
        try {
          const response = await axios.post(API_URL+'/user/login', {
            email,
            password,
          });
          // console.log("response",response?.data?.token)
          const token = response?.data?.token;
          await SecureStore.setItemAsync('token', token);    //set token in secure storage
    
          if (token) {
            //clear all textfields and change the loading state
            setEmail('');
            setPassword('');
            setLoading(false);

            //redirect to home screen
            navigation.navigate('Home')
          }

        } catch (error) {
          console.log(error,"catch error")
          setLoading(false);
          Alert.alert('Login Failed', error?.response?.data?.message === undefined ? 'Network Error' : error?.response?.data?.message);
        }
    }

  return (
    <ScrollView>
        <View style={styles.container}>
            <Text style={styles.text}>App Title</Text>
            <View style={styles.subcontainer}>
            <View style={styles.minicontainer}>
                <View style={styles.microcontainer}>
                <Text style={styles.subtitles}>Login</Text>
                </View>
                <View style={styles.form}>
                <CustomInput value={email} placeholder="Your Email" icon="mail" keyBoardType="email-address" onChange={handleEmailChange}/>
                <CustomInput value={password} placeholder="Password" icon="lock" keyBoardType="default" HiddenText onChange={handlePassChange}/>
                <CustomButton text={loading ? 'Signing in ...' : 'Sign in'} onPress={handleProceedLogin} bg='#092468' color='white'/>
                </View>
                <Text style={tw`mb-4`}>Don't have an account? <Text style={[tw`underline`,{color: "#092468"}]} onPress={()=>navigation.navigate('Signup')}>Register</Text></Text>
            </View>
            </View>
        </View>
    </ScrollView>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#092468',
  },

  subcontainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius:30,
    width:'100%',
    height: 350,
    marginTop: 130,
    backgroundColor: '#ffff',
  },

  minicontainer:{
    flex: 1,
    alignItems: 'center',
    paddingTop: 15
  },

  microcontainer:{
   alignItems:'center',
   paddingTop: 15
  },

  text:{
    fontSize:30,
    fontWeight:900,
    color: "white",
    marginTop: 120
  },

  span:{
    fontSize:30,
    fontWeight:900,
    color: '#fc9403'
  },

  subtitles:{
    color: '#222582',
    fontWeight: 800,
    fontSize: 16,
    marginBottom: 10
  },

  form:{
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width:'100%',
    padding:20,
  },

  linecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },

  linetext: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#ccc',
    fontSize:20
  },

})

export default LoginScreen