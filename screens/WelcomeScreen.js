import React, { useEffect } from 'react';
import { Text,SafeAreaView,StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const WelcomeScreen = ({ navigation }) => {
  //set timer(3seconds) to redirect to signup screen
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Payment');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={[tw`flex-1 items-center pt-44`,styles.container]}>
      <Text style={tw`text-4xl font-bold text-white`}>EUCL</Text>
    </SafeAreaView>
  );
  
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#092468',
  },
})

export default WelcomeScreen;
