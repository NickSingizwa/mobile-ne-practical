import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { API_URL } from '../utils/api';
import axios from 'axios';

const HomeScreen = ({ route }) => {
  const [meterNumber, setMeterNumber] = useState('');
  const [tokenToValidate, setTokenToValidate] = useState('');
  const [queryResult, setQueryResult] = useState('');
  const { token } = route.params;
  const navigation = useNavigation();

  // Check tokens of a meter number
  const handleCheckTokens = async () => {
    if (!meterNumber) {
      Alert.alert('Error', 'Please enter a meter number.');
      return;
    }

    // Check if meter number is 6 digits
    if (meterNumber.length !== 6) {
      Alert.alert('Error', 'Incorrect Meter number.');
      return;
    }

    try {
      const response = await axios.get(API_URL + `/tokens/${meterNumber}`);
      const result = response.data.tokens;
      setQueryResult(result);
    } catch (error) {
      console.log(error, 'catch error');
      setQueryResult('Error occurred while fetching tokens.');
    }
  };

  // Token validation
  const handleTokenValidation = async () => {
    if (!tokenToValidate) {
      Alert.alert('Error', 'Please enter a token to validate.');
      return;
    }

    try {
      const response = await axios.get(API_URL + `/validate/${tokenToValidate}`);
      Alert.alert('Token Validation', response?.data?.message);
    } catch (error) {
      console.log(error, 'catch err');
      Alert.alert('Token Validation', error?.response?.data?.message);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Dashboard</Text>
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenText}>Latest Token: {token}</Text>
        </View>

        <View style={styles.inputContainer}>
          <CustomInput
            value={tokenToValidate}
            placeholder="Enter Token to validate"
            keyboardType="numeric"
            onChange={setTokenToValidate}
          />
          <CustomButton text="Validate Token" onPress={handleTokenValidation} bg="#092468" color="white" />
        </View>

        <View style={styles.inputContainer}>
          <CustomInput
            value={meterNumber}
            placeholder="Enter meter number"
            keyboardType="default"
            onChange={setMeterNumber}
          />
          <CustomButton text="Check Tokens" onPress={handleCheckTokens} bg="#092468" color="white" />
        </View>

        {queryResult !== '' &&
          queryResult.map((item, index) => {
            return (
              <View style={styles.queryResultContainer} key={index}>
                <Text style={styles.queryResultText}>Token {index + 1}: {item.token}</Text>
              </View>
            );
          })}
        
        <CustomButton text="Buy Electricity" onPress={handleGoBack} bg="#092468" color="white" width='w-80'/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tokenContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  tokenText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  daysText: {
    fontSize: 16,
    color: '#888888',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  queryResultContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  queryResultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#092468',
  },
});

export default HomeScreen;
