
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CustomInput = ({ placeholder, icon, keyBoardType, value, HiddenText, onChange }) => {
  return (
    <View style={styles.container}>
      {icon && <AntDesign name={icon} style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyBoardType!=null?keyBoardType:'default'}
        secureTextEntry={HiddenText!=null?true:false}
        value={value}
        onChangeText={value => onChange(value)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 7,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  icon: {
    marginRight: 10,
    fontSize: 20,
  },

  input: {
    flex: 1,
    paddingVertical: 8,
  },

});

export default CustomInput;