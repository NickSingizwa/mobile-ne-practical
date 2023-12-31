import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const CustomButton = ({ text, onPress, bg, color, border, width }) => {
  return (
    <TouchableOpacity style={[tw`${width} ${border}`,styles.button,{backgroundColor: bg}]} onPress={onPress}>
      <Text style={[styles.buttonText,{color}]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  button: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default CustomButton;