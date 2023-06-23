import React,{useState} from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import {API_URL} from '../utils/api';
import axios from 'axios';

const PaymentScreen = () => {
    const navigation = useNavigation();
    //form inputs handling
    const [amount, setAmount] = useState('');
    const [meterNumber, setMeterNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [numOfDays, setNumOfDays] = useState(0);
    const [validationMessage, setValidationMessage] = useState('');   //calculated number of days

    //a function to calculate the number of days based on the entered amount
    const calculateNumOfDays = (amount) => {
      if (amount >= 100) {
        const numOfDays = Math.floor(amount / 100);
        const remainder = amount % 100;
        if (remainder === 0) {
          setNumOfDays(numOfDays);
          setValidationMessage('');
        } else {
          setValidationMessage('Enter an amount that is a multiple of 100 Rwf.');
        }
      } else {
        setNumOfDays(0);
        setValidationMessage('Amount should be greater than or equal to 100 Rwf.');
      }
    };    
  
    const handleAmountChange = (text) => {
      setAmount(text);
      calculateNumOfDays(parseInt(text));
    };
  
    const handleMeterChange = (text) => {
      setMeterNumber(text);
    };
 
    //on login button click
    const handleProceedPayment = async ()=>{
      //check if all fields are entered
        if (!amount || !meterNumber) {
          Alert.alert('Error', 'Please enter amount and meter number.');
          return;
        }

        //check if meter number is 6 digits
        if (meterNumber.length !== 6) {
          Alert.alert('Error', 'Incorrect Meter number.');
          return;
        }

        //check if amount is not less than 100
        if (amount < 100) {
          Alert.alert('Error', 'Amount should be greater than 100 Rwf.');
          return;
        }

        //100=>1day and cannot exceed (365 * 5) days
        if (amount > 182500) {
          Alert.alert('Error', 'Amount should not exceed 182500 Rwf.');
          return;
        }
    
        //change the loading state and make login request to backend
        setLoading(true);
        try {
          const response = await axios.post(API_URL+'/purchase', {
            meter_number: meterNumber,
            amount,
          });
    
          if (response?.data?.success) {
            //clear all textfields and change the loading state
            setAmount('');
            setMeterNumber('');
            setLoading(false);

            Alert.alert('Payment Success', response?.data?.message);

            //redirect to home screen
            navigation.navigate('Home', { token: response?.data?.data?.token })
          }
          else{
            setLoading(false);
            Alert.alert('Payment Failed', response?.data?.message === undefined ? 'Network Error' : response?.data?.message);
          }

        } catch (error) {
          console.log(error,"catch error")
          setLoading(false);
          Alert.alert('Payment Failed', error?.response?.data?.message === undefined ? 'Network Error' : error?.response?.data?.message);
        }
    }

  return (
    <ScrollView>
        <View style={styles.container}>
            <Text style={styles.text}>EUCL</Text>
            <View style={styles.subcontainer}>
            <View style={styles.minicontainer}>
                <View style={styles.microcontainer}>
                <Text style={styles.subtitles}>Buy Electricity</Text>
                </View>
                <View style={styles.form}>
                <CustomInput value={amount} placeholder="Amount of money(Rwf)" keyBoardType="numeric" onChange={handleAmountChange}/>
                {numOfDays > 0 && <Text style={styles.validationText}>{`Lighting will last for ${numOfDays} days.`}</Text>}
                {validationMessage !== '' && <Text style={styles.validationText}>{validationMessage}</Text>}
                <CustomInput value={meterNumber} placeholder="Meter number" keyBoardType="default" HiddenText onChange={handleMeterChange}/>
                <CustomButton text={loading ? 'Processing ...' : 'Continue'} onPress={handleProceedPayment} bg='#092468' color='white'/>
                </View>
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

  validationText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center'
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

export default PaymentScreen