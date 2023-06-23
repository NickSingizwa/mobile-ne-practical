import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { API_URL } from '../utils/api';
import axios from 'axios';

const HomeScreen = () => {
  const [meterNumber, setMeterNumber] = useState('');
  const [tokenToValidate, setTokenToValidate] = useState('');
  const [queryResult, setQueryResult] = useState('');

  const handleCheckTokens = async () => {
    if (!meterNumber) {
      Alert.alert('Error', 'Please enter a meter number.');
      return;
    }

    try {
      const response = await axios.get(API_URL + `/tokens/${meterNumber}`);
      const result = response.data;
      setQueryResult(result);
    } catch (error) {
      console.log(error);
      setQueryResult('Error occurred while fetching token data.');
    }
  };

  const handleTokenValidation = async () => {
    try {
      const response = await axios.get(API_URL + `/validate/${tokenToValidate}`);
      console.log(response,"third resss")
      Alert.alert('Token Validation', response?.data?.message);
    } catch (error) {
      console.log(error,"catch err");
      Alert.alert('Token Validation', error?.response?.data?.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text style={styles.heading}>Token Details</Text>
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenText}>Token: {token}</Text>
          <Text style={styles.daysText}>Valid for {numOfDays} days</Text>
        </View> */}

        <View style={styles.inputContainer}>
          <CustomInput
            value={meterNumber}
            placeholder="Enter meter number"
            keyboardType="numeric"
            onChange={setMeterNumber}
          />
          <CustomButton text="Check Tokens" onPress={handleCheckTokens} bg="#092468" color="white" />
        </View>

        {queryResult !== '' && (
          <View style={styles.queryResultContainer}>
            <Text style={styles.queryResultText}>Query Result: {queryResult}</Text>
          </View>
        )}

        <CustomButton text="Validate Token" onPress={handleTokenValidation} bg="#092468" color="white" />
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
